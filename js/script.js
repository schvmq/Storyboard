// =========================
// PAGE LOAD TRANSITION
// =========================

window.addEventListener("DOMContentLoaded", () => {
    // Add small delay so styles attach before fading in
    requestAnimationFrame(() => {
        document.body.classList.add("page-loaded");
    });
});



/* =========================
   PAGE SKATEBOARD TRACKER
========================= */

const skateboardTracker =
    document.querySelector('.storyboard-tracker');


if (skateboardTracker) {

    let skateboardTicking = false;
    let scrollTimeout;


    function updateSkateboardTracker() {

        const documentHeight =
            document.documentElement.scrollHeight;

        const viewportHeight =
            window.innerHeight;

        const scrollableHeight =
            documentHeight - viewportHeight;


        let progress = 0;

        if (scrollableHeight > 0) {

            progress =
                window.scrollY /
                scrollableHeight;

        }


        progress =
            Math.max(
                0,
                Math.min(1, progress)
            );


        const skateboardWidth =
            skateboardTracker.offsetWidth;

        const maxTravel =
            window.innerWidth -
            skateboardWidth;


        const x =
            progress * maxTravel;


        /*
         * Save the current horizontal position
         * so the stopping animation doesn't
         * move the skateboard sideways.
         */

        skateboardTracker.style.setProperty(
            '--skate-x',
            `${x}px`
        );


        skateboardTracker.style.transform =
            `translateX(${x}px) rotate(-2deg)`;


        /*
         * Rolling animation while scrolling.
         */

        skateboardTracker.classList
            .add('is-moving');

        skateboardTracker.classList
            .remove('is-stopping');


        /*
         * Wait until scrolling stops.
         */

        clearTimeout(scrollTimeout);


        scrollTimeout = setTimeout(() => {

            skateboardTracker.classList
                .remove('is-moving');

            skateboardTracker.classList
                .add('is-stopping');


            /*
             * Remove stopping animation
             * after it finishes.
             */

            setTimeout(() => {

                skateboardTracker.classList
                    .remove('is-stopping');

            }, 650);

        }, 180);


        skateboardTicking = false;
    }


    function requestSkateboardUpdate() {

        if (!skateboardTicking) {

            window.requestAnimationFrame(
                updateSkateboardTracker
            );

            skateboardTicking = true;
        }
    }


    window.addEventListener(
        'scroll',
        requestSkateboardUpdate,
        { passive: true }
    );


    window.addEventListener(
        'resize',
        requestSkateboardUpdate
    );


    updateSkateboardTracker();

}



// ==========================================
// SMART SHOW/HIDE NAVBAR & BACK BUTTON ON SCROLL
// ==========================================

(() => {
    const nav = document.getElementById("mainNav");
    const backBtn = document.querySelector(".nav-back-btn");
    
    if (!nav && !backBtn) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 10;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Keep visible near the top
        if (currentScrollY <= 60) {
            if (nav) nav.classList.remove("is-hidden");
            if (backBtn) backBtn.classList.remove("is-hidden");
            lastScrollY = currentScrollY;
            return;
        }

        if (Math.abs(currentScrollY - lastScrollY) < threshold) {
            return;
        }

        if (currentScrollY > lastScrollY) {
            // Scrolling down -> hide
            if (nav) nav.classList.add("is-hidden");
            if (backBtn) backBtn.classList.add("is-hidden");
        } else {
            // Scrolling up -> show
            if (nav) nav.classList.remove("is-hidden");
            if (backBtn) backBtn.classList.remove("is-hidden");
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
})();


// ==========================================
// SMART SHOW/HIDE NAVBAR & BACK BUTTON ON SCROLL
// ==========================================

(() => {
    const nav = document.getElementById("mainNav");
    const backBtn = document.querySelector(".nav-back-btn");
    
    if (!nav && !backBtn) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 10;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Keep visible near the top
        if (currentScrollY <= 60) {
            if (nav) nav.classList.remove("is-hidden");
            if (backBtn) backBtn.classList.remove("is-hidden");
            lastScrollY = currentScrollY;
            return;
        }

        if (Math.abs(currentScrollY - lastScrollY) < threshold) {
            return;
        }

        if (currentScrollY > lastScrollY) {
            // Scrolling down -> hide
            if (nav) nav.classList.add("is-hidden");
            if (backBtn) backBtn.classList.add("is-hidden");
        } else {
            // Scrolling up -> show
            if (nav) nav.classList.remove("is-hidden");
            if (backBtn) backBtn.classList.remove("is-hidden");
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
})();


// ==========================================
// SMART SHOW/HIDE NAV BACK BUTTON ON SCROLL
// ==========================================

(() => {
    const backBtn = document.querySelector(".nav-back-btn");
    if (!backBtn) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 10; // Minimum scroll pixels to trigger toggle

    window.addEventListener("scroll", () => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Always show button near the very top of the page
        if (currentScrollY <= 50) {
            backBtn.classList.remove("is-hidden");
            lastScrollY = currentScrollY;
            return;
        }

        // Check if scroll delta exceeds the threshold
        if (Math.abs(currentScrollY - lastScrollY) < threshold) {
            return;
        }

        if (currentScrollY > lastScrollY) {
            // Scrolling down -> Hide
            backBtn.classList.add("is-hidden");
        } else {
            // Scrolling up -> Show
            backBtn.classList.remove("is-hidden");
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
})();


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
        const isMobile = window.innerWidth <= 768;
        const canvas = document.querySelector(".desktop-canvas");

        let scale = 1;
        if (canvas) {
            // Read active CSS scale factor
            const transform = window.getComputedStyle(canvas).transform;
            if (transform && transform !== "none") {
                const matrix = new DOMMatrixReadOnly(transform);
                scale = matrix.a || 1;
            }
        }

        /* 
           Visual distance correction:
           On mobile with transform scale, divide visual delta by scale 
           or use the unscaled offsetTop * scale.
        */
        let targetPosition;

        if (isMobile && scale < 1) {
            // Unscaled DOM offset mapped to real scaled viewport height
            targetPosition = (kickOff.offsetTop * scale) + 1900;
        } else {
            targetPosition = kickOff.getBoundingClientRect().top + window.scrollY + 80;
        }

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
   ZOOM-SAFE CANVAS SCALING & MOBILE FIX
========================================== */

function isPinchZooming() {
    return window.visualViewport && window.visualViewport.scale > 1.02;
}

function syncCanvasHeight() {
    // Prevent zoom resets: never recalculate or change DOM styles when the user is zooming
    if (isPinchZooming()) return;

    const canvas = document.querySelector('.desktop-canvas');
    if (!canvas) return;

    const currentWidth = window.innerWidth;
    const baseWidth = 1100;

    if (currentWidth < baseWidth) {
        const scale = currentWidth / baseWidth;
        const actualContentHeight = canvas.scrollHeight;
        const scaledHeight = actualContentHeight * scale;
        const heightDiff = actualContentHeight - scaledHeight;

        canvas.style.transformOrigin = 'top left';
        canvas.style.transform = `scale(${scale})`;
        canvas.style.width = `${baseWidth}px`;
        canvas.style.marginBottom = `-${heightDiff}px`;
    } else {
        canvas.style.transform = '';
        canvas.style.transformOrigin = '';
        canvas.style.width = '';
        canvas.style.marginBottom = '';
    }
}

// Window listeners
window.addEventListener('DOMContentLoaded', syncCanvasHeight);
window.addEventListener('load', syncCanvasHeight);
window.addEventListener('resize', () => {
    if (!isPinchZooming()) {
        syncCanvasHeight();
    }
});




/* ==========================================
   SECTION SCROLL TRANSITIONS & THEME SWITCH
========================================== */

function initScrollTransitions() {
    const isBackAlley = document.querySelector('.back-alley__chapters') !== null;
    const isCrew = document.querySelector('.crew__members') !== null;
    const isMultiReveal = isBackAlley || isCrew;

    let sections = [];

    if (isBackAlley) {
        sections = document.querySelectorAll('.back-alley__chapters [data-section]');
    } else if (isCrew) {
        sections = document.querySelectorAll('.crew__members [data-section]');
    } else {
        sections = document.querySelectorAll('[data-section]');
    }

    if (sections.length === 0) return;

    let activeIndex = -1;
    let activeSection = null;

    function updateActiveSection() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const isMobile = window.innerWidth <= 768;

        /* --- BACK ALLEY & CREW 50% REVEAL --- */
        if (isMultiReveal) {
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (index === 0) {
                    if (rect.top <= viewportHeight * 0.75) section.classList.add('is-active');
                } else {
                    const prevRect = sections[index - 1].getBoundingClientRect();
                    const scrolled50 = (prevRect.top + (sections[index - 1].offsetHeight * 0.5)) <= (viewportHeight * 0.5);
                    if (scrolled50 || rect.top <= viewportHeight * 0.5) section.classList.add('is-active');
                }
            });
            return;
        }

        /* --- MAIN PAGE: MOBILE (PAIRED 2-SECTION TRANSITION) --- */
        if (isMobile) {
            let currentIndex = 0;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= viewportHeight * 0.60) {
                    currentIndex = index;
                }
            });

            if (currentIndex === activeIndex) return;
            activeIndex = currentIndex;

            sections.forEach(sec => sec.classList.remove('is-active', 'is-active-next'));

            if (sections[currentIndex]) {
                sections[currentIndex].classList.add('is-active');
                if (sections[currentIndex].dataset.theme) {
                    document.body.dataset.theme = sections[currentIndex].dataset.theme;
                }
            }

            if (sections[currentIndex + 1]) {
                sections[currentIndex + 1].classList.add('is-active-next');
            }
            return;
        }

        /* --- MAIN PAGE: DESKTOP (STRICT 1-SECTION 90% TRANSITION) --- */
        let currentSection = null;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollPosition;
            const sectionHeight = section.offsetHeight;

            const triggerPoint = sectionTop + (sectionHeight * 0.90);

            if (scrollPosition + viewportHeight * 0.5 >= triggerPoint) {
                currentSection = sections[index + 1] || section;
            }
        });

        if (!currentSection) {
            currentSection = sections[0];
        }

        if (currentSection === activeSection) return;

        sections.forEach(section => {
            section.classList.remove('is-active', 'is-active-next');
        });

        if (currentSection) {
            currentSection.classList.add('is-active');
            if (currentSection.dataset.theme) {
                document.body.dataset.theme = currentSection.dataset.theme;
            }
        }

        activeSection = currentSection;
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTransitions);
} else {
    initScrollTransitions();
}


/* ==========================================
   SOUNDCLOUD BACKGROUND PLAYER & FLOATING UI
========================================== */

function initSoundCloudPlayer() {
    const musicTrigger = document.querySelector('.b-side__item--music');
    const scIframe = document.getElementById('sc-player');
    const floatingBar = document.getElementById('musicFloatingBar');
    const trackTitle = document.getElementById('musicTrackTitle');
    const playToggleBtn = document.getElementById('musicPlayToggleBtn');
    const playIcon = document.getElementById('musicPlayIcon');
    const prevBtn = document.getElementById('musicPrevBtn');
    const nextBtn = document.getElementById('musicNextBtn');
    const selectElem = document.getElementById('musicPlaylistSelect');

    if (!scIframe) return;

    if (typeof SC === 'undefined' || !SC.Widget) {
        setTimeout(initSoundCloudPlayer, 150);
        return;
    }

    const widget = SC.Widget(scIframe);

    // Update song title display
    function updateCurrentTrack() {
        widget.getCurrentSound((sound) => {
            if (sound && sound.title && trackTitle) {
                trackTitle.textContent = sound.title;
            }
        });
    }

    // Populate track dropdown once playlist is parsed
    widget.bind(SC.Widget.Events.READY, () => {
        widget.setVolume(80);
        
        widget.getSounds((sounds) => {
            if (sounds && sounds.length && selectElem) {
                selectElem.innerHTML = '';
                sounds.forEach((sound, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${index + 1}. ${sound.title}`;
                    selectElem.appendChild(option);
                });
            }
        });

        updateCurrentTrack();
    });

    // Cassette Image Click
    if (musicTrigger) {
        musicTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            widget.toggle();
        });
    }

    // Floating UI Controls
    if (playToggleBtn) {
        playToggleBtn.addEventListener('click', () => widget.toggle());
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            widget.prev();
            setTimeout(updateCurrentTrack, 400);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            widget.next();
            setTimeout(updateCurrentTrack, 400);
        });
    }

    if (selectElem) {
        selectElem.addEventListener('change', (e) => {
            const trackIndex = parseInt(e.target.value, 10);
            widget.skip(trackIndex);
            widget.play();
            setTimeout(updateCurrentTrack, 400);
        });
    }

    // Event Syncs
    widget.bind(SC.Widget.Events.PLAY, () => {
        if (musicTrigger) musicTrigger.classList.add('is-playing');
        if (floatingBar) floatingBar.classList.add('is-active');
        if (playIcon) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }
        updateCurrentTrack();
    });

    widget.bind(SC.Widget.Events.PAUSE, () => {
        if (musicTrigger) musicTrigger.classList.remove('is-playing');
        if (floatingBar) floatingBar.classList.remove('is-active');
        if (playIcon) {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });

    widget.bind(SC.Widget.Events.FINISH, () => {
        if (musicTrigger) musicTrigger.classList.remove('is-playing');
        if (floatingBar) floatingBar.classList.remove('is-active');
        if (playIcon) {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSoundCloudPlayer);
} else {
    initSoundCloudPlayer();
}