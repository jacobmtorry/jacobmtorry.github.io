export function initFabricBackground() {
    const fabric = document.getElementById("fabricBg");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!fabric || reduceMotion.matches) return;

    const columns = 8;
    const rows = 6;
    const cells = new Map();
    const tracks = [];

    function key(col, row) {
        return `${col}:${row}`;
    }

    function makeCell(col, row) {
        const cell = document.createElement("span");
        cell.className = "fabricCell";
        cell.style.setProperty("--fabric-x", `${8 + col * 12}%`);
        cell.style.setProperty("--fabric-y", `${10 + row * 16}%`);
        cell.dataset.fabricKey = key(col, row);
        fabric.appendChild(cell);
        cells.set(key(col, row), cell);
    }

    function makeTrack(fromCol, fromRow, toCol, toRow) {
        const fromX = 8 + fromCol * 12;
        const fromY = 10 + fromRow * 16;
        const toX = 8 + toCol * 12;
        const toY = 10 + toRow * 16;
        const track = document.createElement("span");
        const horizontal = fromRow === toRow;

        track.className = `fabricTrack ${horizontal ? "isHorizontal" : "isVertical"}`;
        track.style.setProperty("--fabric-x", `${Math.min(fromX, toX)}%`);
        track.style.setProperty("--fabric-y", `${Math.min(fromY, toY)}%`);
        track.style.setProperty("--fabric-length", `${horizontal ? Math.abs(toX - fromX) : Math.abs(toY - fromY)}%`);
        track.dataset.from = key(fromCol, fromRow);
        track.dataset.to = key(toCol, toRow);
        fabric.appendChild(track);
        tracks.push(track);
    }

    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
            makeCell(col, row);
        }
    }

    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns - 1; col += 1) {
            makeTrack(col, row, col + 1, row);
        }
    }

    for (let col = 0; col < columns; col += 1) {
        for (let row = 0; row < rows - 1; row += 1) {
            if ((col + row) % 2 === 0 || col === 0 || col === columns - 1) {
                makeTrack(col, row, col, row + 1);
            }
        }
    }

    function activateTrack(track) {
        const from = cells.get(track.dataset.from);
        const to = cells.get(track.dataset.to);

        track.classList.add("isActive");
        from?.classList.add("isActive");

        setTimeout(() => {
            to?.classList.add("isActive");
        }, 420);

        setTimeout(() => {
            track.classList.remove("isActive");
            from?.classList.remove("isActive");
            to?.classList.remove("isActive");
        }, 1200);
    }

    const timer = setInterval(() => {
        const track = tracks[Math.floor(Math.random() * tracks.length)];
        activateTrack(track);
    }, 360);

    reduceMotion.addEventListener("change", (event) => {
        if (!event.matches) return;
        clearInterval(timer);
        fabric.replaceChildren();
    });
}
