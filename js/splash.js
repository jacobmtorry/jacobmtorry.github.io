export function initSplash() {
    const splash = document.getElementById("splash");
    const chip = document.querySelector(".chip");
    const site = document.getElementById("site");
    const bootFill = document.getElementById("bootFill");
    const bootPct = document.getElementById("bootPct");
    const skipIntro = document.getElementById("skipIntro");

    if (!splash || !chip || !site) return;

    let booting = false;

    function revealSite() {
        site.dataset.hidden = "false";
        const heroHeading = document.querySelector(".hero h1");
        if (heroHeading) {
            heroHeading.setAttribute("tabindex", "-1");
        }
    }

    function hideSplash() {
        splash.classList.add("fadeOut");
        setTimeout(() => (splash.style.display = "none"), 520);
    }

    function runBootSequence() {
        if (booting) return;
        booting = true;

        splash.classList.add("booting"); // triggers PCB + pin glow

        let pct = 0;
        const tick = setInterval(() => {
            pct += Math.floor(Math.random() * 7) + 3; // 3–9%
            if (pct > 100) pct = 100;

            if (bootFill) bootFill.style.width = `${pct}%`;
            if (bootPct) bootPct.textContent = `${pct}%`;

            if (pct === 100) {
                clearInterval(tick);
                setTimeout(() => {
                    revealSite();
                    hideSplash();
                }, 250);
            }
        }, 90);
    }

    function skip() {
        splash.classList.add("booting");
        if (bootFill) bootFill.style.width = "100%";
        if (bootPct) bootPct.textContent = "100%";
        revealSite();
        hideSplash();
    }

    requestAnimationFrame(() => {
        runBootSequence();
    });

    if (skipIntro) skipIntro.addEventListener("click", skip);
}
