/* =========================
   SKID MARKS
========================= */

const skidMarks =
    document.querySelectorAll(".skid-mark");


/* =========================
   SKID MARK POSITIONS
========================= */

const skidPositions = [

    {
        top: "72%",
        left: "8%",
        rotation: "25deg"
    },

    {
        top: "15%",
        right: "7%",
        rotation: "25deg"
    },

    {
        top: "70%",
        left: "5%",
        rotation: "135deg"
    },

    {
        top: "75%",
        left: "35%",
        rotation: "40deg"
    },

    {
        top: "75%",
        right: "12%",
        rotation: "140deg"
    },

    {
        top: "25%",
        right: "5%",
        rotation: "28deg"
    },

    {
        top: "75%",
        left: "18%",
        rotation: "18deg"
    },

    {
        top: "70%",
        right: "10%",
        rotation: "150deg"
    }
    
];


/* =========================
   SET SKID POSITIONS
========================= */

function setSkidPositions() {

    skidMarks.forEach(
        (skidMark, index) => {

            const position =
                skidPositions[
                    index %
                    skidPositions.length
                ];


            skidMark.style.top =
                position.top || "auto";

            skidMark.style.bottom =
                position.bottom || "auto";

            skidMark.style.left =
                position.left || "auto";

            skidMark.style.right =
                position.right || "auto";


            skidMark.style.transform =
                `rotate(${position.rotation})`;

        }
    );

}


/* =========================
   UPDATE SKID MARKS
========================= */

function updateSkidMarks() {

    const viewportCenter =
        window.scrollY +
        window.innerHeight / 2;


    skidMarks.forEach(
        skidMark => {

            const section =
                skidMark.closest("section");


            if (!section) {
                return;
            }


            const sectionTop =
                section.offsetTop;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            /* =========================
               SECTION ACTIVE
            ========================== */

            if (
                viewportCenter >= sectionTop &&
                viewportCenter < sectionBottom
            ) {

                skidMark.classList.add(
                    "is-visible"
                );

            } else {

                skidMark.classList.remove(
                    "is-visible"
                );

            }

        }
    );

}


/* =========================
   SCROLL EVENT
========================= */

window.addEventListener(
    "scroll",
    updateSkidMarks
);

// =========================
// START THE RIDE
// =========================

const startRide = document.querySelector("#start-ride");
const kickOff = document.querySelector("#kick-off");

if (startRide && kickOff) {

    startRide.addEventListener("click", () => {

        /* Scroll to Kick Off */
        const targetPosition =
            kickOff.getBoundingClientRect().top +
            window.scrollY +
            110;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });


        /* Wait for the scroll to reach the section */
        setTimeout(() => {

            kickOff.classList.remove("kick-off-arrive");

            /* Restart animation */
            void kickOff.offsetWidth;

            kickOff.classList.add("kick-off-arrive");

        }, 700);

    });

}


/* =========================
   INITIALIZE
========================= */

setSkidPositions();

updateSkidMarks();


/* ==========================================
   SCRAPBOOK DESKTOP CANVAS AUTO-SCALE
========================================== */

function autoScaleScrapbookCanvas() {
    const canvas = document.querySelector('.desktop-canvas');
    if (!canvas) return;

    const baseWidth = 1100; // Target design width
    const screenWidth = window.innerWidth;

    if (screenWidth < baseWidth) {
        const scale = screenWidth / baseWidth;
        canvas.style.transform = `scale(${scale})`;
        canvas.style.transformOrigin = 'top left';
        canvas.style.width = `${baseWidth}px`;
        // Adjust height so space beneath doesn't collapse or create dead gaps
        canvas.parentElement.style.minHeight = 'auto';
        canvas.style.marginBottom = `-${(1 - scale) * canvas.offsetHeight}px`;
    } else {
        canvas.style.transform = 'none';
        canvas.style.marginBottom = '0px';
    }
}

function syncCanvasHeight() {
    const canvas = document.querySelector('.desktop-canvas');
    if (!canvas) return;
    const scale = Math.min(1, window.innerWidth / 1100);
    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = 'top left';
    canvas.style.marginBottom = scale < 1 ? `-${(1 - scale) * canvas.scrollHeight}px` : '0px';
}

window.addEventListener('resize', syncCanvasHeight);
window.addEventListener('DOMContentLoaded', syncCanvasHeight);
window.addEventListener('load', syncCanvasHeight);