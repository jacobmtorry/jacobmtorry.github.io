// Replace these example stages with your actual process. Image paths are relative
// to index.html (for example: images/nanolab/lithography.jpg). Keep alt descriptive.
export const fabricationStages = [
    { title: "Wafer preparation", label: "prepare", image: "images/IMG_7407.jpg", alt: "Wafer preparation photo", description: "4in Si Wafer (100) ∙ Initial Degrease ∙ RCA Clean ∙ Initial Oxidation" },
    { title: "Photolithography", label: "pattern", image: "images/IMG_7408.jpg", alt: "Nanolab project photograph for the patterning stage", description: "Spun on Photoresist ∙ Align Mask ∙ UV Exposure ∙ Development" },
    { title: "Etching", label: "etch", image: "images/IMG_7409.jpg", alt: "", description: "HF Etch ∙ Strip Photoresist" },
];

function photo(stage) {
    if (stage.image) {
        const image = document.createElement("img");
        image.src = stage.image;
        image.alt = stage.alt;
        image.loading = "lazy";
        image.addEventListener("error", () => image.replaceWith(placeholder()), { once: true });
        return image;
    }
    return placeholder();
}

function placeholder() {
    const panel = document.createElement("div");
    panel.className = "fabPlaceholder";
    const label = document.createElement("span");
    label.textContent = "LAB PHOTO / COMING SOON";
    panel.append(label);
    return panel;
}

export function initNanolab() {
    const map = document.querySelector("#waferDies");
    if (!map) return;
    const previous = document.querySelector("#fabPrevious");
    const next = document.querySelector("#fabNext");
    const positions = [[2, 2], [2, 4], [3, 3], [4, 2], [4, 4]];
    let selected = 0;
    const visited = new Set();
    const buttons = fabricationStages.map((stage, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "waferDie";
        button.textContent = String(index + 1).padStart(2, "0");
        button.style.gridRow = positions[index][0];
        button.style.gridColumn = positions[index][1];
        button.title = stage.title;
        button.setAttribute("aria-label", `Stage ${index + 1}: ${stage.title}`);
        button.setAttribute("aria-controls", "waferTitle waferPhoto waferDescription");
        button.addEventListener("click", () => select(index));
        button.addEventListener("keydown", event => {
            const direction = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
            if (direction) {
                event.preventDefault();
                const target = Math.max(0, Math.min(buttons.length - 1, index + direction));
                buttons[target].focus();
                select(target);
            }
        });
        map.append(button);
        return button;
    });
    function select(index) {
        selected = index;
        visited.add(index);
        const stage = fabricationStages[index];
        buttons.forEach((button, i) => {
            button.classList.toggle("isVisited", visited.has(i));
            button.setAttribute("aria-pressed", String(i === index));
        });
        document.querySelector("#waferPhoto").replaceChildren(photo(stage));
        document.querySelector("#waferLabel").textContent = `${String(index + 1).padStart(2, "0")} / ${stage.label}`;
        document.querySelector("#waferTitle").textContent = stage.title;
        document.querySelector("#waferDescription").textContent = stage.description;
        document.querySelector("#fabStatus").textContent = `STEP ${String(index + 1).padStart(2, "0")} / ${String(buttons.length).padStart(2, "0")} — ${stage.title}`;
        previous.disabled = index === 0;
        next.disabled = index === buttons.length - 1;
    }
    previous.addEventListener("click", () => select(Math.max(0, selected - 1)));
    next.addEventListener("click", () => select(Math.min(buttons.length - 1, selected + 1)));
    select(0);
}
