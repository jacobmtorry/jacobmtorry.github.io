const splash = document.getElementById("splash");
const chip = document.querySelector(".chip");
const site = document.getElementById("site");
const bootFill = document.getElementById("bootFill");
const bootPct = document.getElementById("bootPct");
const skipIntro = document.getElementById("skipIntro");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

let booting = false;

function revealSite() {
  site.dataset.hidden = "false";
  // For screen readers / keyboard users: move focus somewhere meaningful
  const heroHeading = document.querySelector(".hero h1");
  if (heroHeading) heroHeading.setAttribute("tabindex", "-1"), heroHeading.focus();
}

function hideSplash() {
  splash.classList.add("fadeOut");
  setTimeout(() => splash.style.display = "none", 520);
}

function runBootSequence() {
  if (booting) return;
  booting = true;

  let pct = 0;
  const tick = setInterval(() => {
    pct += Math.floor(Math.random() * 7) + 3; // 3–9%
    if (pct > 100) pct = 100;

    bootFill.style.width = `${pct}%`;
    bootPct.textContent = `${pct}%`;

    if (pct === 100) {
      clearInterval(tick);
      // slight delay so it feels intentional
      setTimeout(() => {
        revealSite();
        hideSplash();
      }, 250);
    }
  }, 60);
}

function skip() {
  // instantly “complete” boot for impatient users
  bootFill.style.width = "100%";
  bootPct.textContent = "100%";
  revealSite();
  hideSplash();
}

chip.addEventListener("click", runBootSequence);
chip.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") runBootSequence();
});

skipIntro.addEventListener("click", skip);

/* Simple modal project details */
const projectDetails = {
  p1: `
    <h2>Out-of-Order RISC-V Core</h2>
    <p>Deep dive: pipeline, LSQ, cache hierarchy, verification strategy, and performance tuning.</p>
    <ul>
      <li>Include diagrams: issue/execute/commit, LSQ structure, cache pipeline.</li>
      <li>Include metrics: IPC, hit/miss behavior, WNS tradeoffs, etc.</li>
    </ul>
    <p><a href="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO" target="_blank" rel="noreferrer">View repo</a></p>
  `,
  p2: `
    <h2>FPGA Pac-Man HDMI</h2>
    <p>Deep dive: AXI4-Lite interface, BRAM tilemap, palette, sprite overlay, and MicroBlaze game loop.</p>
    <p><a href="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO" target="_blank" rel="noreferrer">View repo</a></p>
  `,
  p3: `
    <h2>Data Tooling (Python)</h2>
    <p>Deep dive: GUI workflow, normalization/interpolation, batch processing, and plotting.</p>
    <p><a href="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO" target="_blank" rel="noreferrer">View repo</a></p>
  `,
};

function openModal(key) {
  modalContent.innerHTML = projectDetails[key] || "<p>Missing content.</p>";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-modal]").forEach(card => {
  card.addEventListener("click", () => openModal(card.dataset.modal));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openModal(card.dataset.modal);
  });
  card.setAttribute("tabindex", "0");
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
