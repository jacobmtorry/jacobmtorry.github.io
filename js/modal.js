import { projectDetails } from "./projects.js";

export function initModal() {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const modalClose = document.getElementById("modalClose");

    if (!modal || !modalContent || !modalClose) return;

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

    document.querySelectorAll("[data-modal]").forEach((card) => {
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
}
