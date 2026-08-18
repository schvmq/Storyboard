// ==========================================
// SUPABASE CLIENT INITIALIZATION
// ==========================================
const SUPABASE_URL = "https://faurwgyuxjytcjiwgaht.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdXJ3Z3l1eGp5dGNqaXdnYWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjgwMDcsImV4cCI6MjEwMjY0NDAwN30.Tbid4sgKP_BJt033ErbXl8yUr3t0gxgDs4Rw_Zwt5Cs"; // Keep your anon public key

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const wall = document.querySelector(".leave-mark");
const colorDots = document.querySelectorAll(".color-dot");
const fontSelect = document.getElementById("graffitiFontSelect");

let currentColor = "#1E1E1E";
let currentFont = "'Permanent Marker', cursive";
let activeInput = null;
let lastPostTime = 0;
const POST_COOLDOWN_MS = 8000; // 8-second cooldown between tags

// ==========================================
// 1. TOOLBAR CONTROLS (COLOR & FONT)
// ==========================================
colorDots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        e.stopPropagation();
        colorDots.forEach(d => d.classList.remove("is-active"));
        dot.classList.add("is-active");
        currentColor = dot.dataset.color;
        if (activeInput) {
            activeInput.style.color = currentColor;
        }
    });
});

if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
        currentFont = e.target.value;
        if (activeInput) {
            activeInput.style.fontFamily = currentFont;
        }
    });
}

// ==========================================
// 2. DOUBLE-CLICK TO DROP A TAG
// ==========================================
if (wall) {
    wall.addEventListener("dblclick", (e) => {
        if (e.target.closest("#graffitiToolbar") || e.target.classList.contains("graffiti-inline-input")) {
            return;
        }

        const now = Date.now();
        if (now - lastPostTime < POST_COOLDOWN_MS) {
            const remaining = Math.ceil((POST_COOLDOWN_MS - (now - lastPostTime)) / 1000);
            alert(`Hold up! You can leave another mark in ${remaining}s.`);
            return;
        }

        if (activeInput) {
            saveAndCloseInput(activeInput);
        }

        const rect = wall.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

        createInlineInput(xPercent, yPercent);
    });
}

function createInlineInput(x, y) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 80;
    input.placeholder = "type tag & hit enter...";
    input.className = "graffiti-inline-input";
    input.style.left = `${x}%`;
    input.style.top = `${y}%`;
    input.style.color = currentColor;
    input.style.fontFamily = currentFont;

    input.dataset.x = x;
    input.dataset.y = y;

    wall.appendChild(input);
    input.focus();
    activeInput = input;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveAndCloseInput(input);
        } else if (e.key === "Escape") {
            input.remove();
            activeInput = null;
        }
    });

    input.addEventListener("blur", () => {
        saveAndCloseInput(input);
    });
}

// ==========================================
// 3. PERSIST TAG TO SUPABASE
// ==========================================
async function saveAndCloseInput(inputElement) {
    let message = inputElement.value.trim();
    const x = parseFloat(inputElement.dataset.x);
    const y = parseFloat(inputElement.dataset.y);

    inputElement.remove();
    activeInput = null;

    // Sanitize HTML tags
    message = message.replace(/<\/?[^>]+(>|$)/g, "");

    if (!message) return;

    lastPostTime = Date.now();

    const rotation = (Math.random() * 22 - 11).toFixed(1); // -11deg to +11deg tilt
    const fontSize = (Math.random() * 0.4 + 1.2).toFixed(2); // 1.2rem to 1.6rem

    const newTag = {
        message: message,
        color: currentColor,
        font_style: currentFont,
        x_pos: x,
        y_pos: y,
        rotation: parseFloat(rotation),
        font_size: parseFloat(fontSize)
    };

    // Optimistic render locally
    renderTag(newTag);

    // Save to Database
    const { error } = await supabaseClient.from("graffiti").insert([newTag]);
    if (error) {
        console.error("Error saving mark to Supabase:", error.message);
    }
}

// ==========================================
// 4. RENDER TAG ONTO WALL
// ==========================================
function renderTag(tag) {
    if (!wall) return;

    const span = document.createElement("span");
    span.className = "graffiti-tag";
    span.textContent = tag.message;
    span.style.left = `${tag.x_pos}%`;
    span.style.top = `${tag.y_pos}%`;
    span.style.color = tag.color;
    span.style.fontFamily = tag.font_style || "'Permanent Marker', cursive";
    span.style.fontSize = `${tag.font_size || 1.3}rem`;
    span.style.transform = `translate(-50%, -50%) rotate(${tag.rotation || 0}deg)`;

    wall.appendChild(span);
}

// ==========================================
// 5. FETCH EXISTING TAGS ON LOAD
// ==========================================
async function fetchGraffiti() {
    const { data, error } = await supabaseClient
        .from("graffiti")
        .select("*")
        .order("created_at", { ascending: true });

    if (!error && data) {
        document.querySelectorAll(".graffiti-tag").forEach(el => el.remove());
        data.forEach(renderTag);
    } else if (error) {
        console.error("Error fetching marks:", error.message);
    }
}

// ==========================================
// 6. REALTIME UPDATES
// ==========================================
supabaseClient
    .channel("public:graffiti")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "graffiti" }, (payload) => {
        renderTag(payload.new);
    })
    .subscribe();

// Load tags on startup
fetchGraffiti();

let lastTap = 0;
wall.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    // Detect double-tap within 350ms
    if (tapLength < 350 && tapLength > 0) {
        const touch = e.changedTouches[0];
        const rect = wall.getBoundingClientRect();
        const xPercent = ((touch.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((touch.clientY - rect.top) / rect.height) * 100;

        createInlineInput(xPercent, yPercent);
        e.preventDefault();
    }
    lastTap = currentTime;
});

// Quick marker audio trigger inside saveAndCloseInput()
const sprayAudio = new Audio('assets/sounds/spray.mp3');
sprayAudio.volume = 0.4;
sprayAudio.play().catch(() => {}); // silent fail if autoplay blocked