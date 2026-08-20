// Disable browser scroll memory
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Reset immediately before paint
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    document.body.classList.add("is-locked");

    setTimeout(() => {
        document.body.classList.remove("is-locked");
        document.body.classList.add("page-loaded");

        const flash = document.getElementById("flashOverlay");
        if (flash) {
            setTimeout(() => flash.remove(), 1000);
        }
    }, 2000);
});