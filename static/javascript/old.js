
const highlightCell = (col, row) => {
    const x = col * totalCellSize;
    const y = row * totalCellSize;
    ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
    ctx.fillRect(x, y, cellSize, cellSize);
};

canvas.addEventListener('mousemove', (e) => {
    if (imagesLoaded === totalImages) {
        drawGrid();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        console.log(scaleX+" - "+scaleY)
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const col = Math.floor(x / totalCellSize);
        const row = Math.floor(y / totalCellSize);

        highlightCell(col, row);
    }
});

canvas.addEventListener('mouseleave', () => {
    if (imagesLoaded === totalImages) {
        drawGrid();
    }
});

canvas.addEventListener('click', (e) => {
    if (imagesLoaded === totalImages) {
        const rect = canvas.getBoundingClientRect(); //коор курсора
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const col = Math.floor(x / totalCellSize);
        const row = Math.floor(y / totalCellSize);
        console.log(rect.width)

        const existingBuilding = buildings.find(building => building.col === col && building.row === row);
        const popup = document.getElementById('popup');

        if (existingBuilding) {
            popup.style.display = 'block';
            document.getElementById('buildButton').style.display = 'none';
            document.getElementById('freeButton').style.display = 'none';
            document.getElementById('sellButton').style.display = 'block';

            const sellButton = document.getElementById('sellButton');
            sellButton.onclick = () => {
                buildings.splice(buildings.indexOf(existingBuilding), 1);
                drawGrid();
                popup.style.display = 'none';
            };
        } else {
            popup.style.display = 'block';
            document.getElementById('buildButton').style.display = 'block';
            document.getElementById('freeButton').style.display = 'block';
            document.getElementById('sellButton').style.display = 'none';

            const buildButton = document.getElementById('buildButton');
            buildButton.onclick = () => {
                window.location.href = './game.html';
            };

            const freeButton = document.getElementById('freeButton');
            freeButton.onclick = () => {
                buildings.push({ col, row });
                drawGrid();
                popup.style.display = 'none';
            };
        }
    }
});

// Close popup on outside click
window.addEventListener('click', (e) => {
    const popup = document.getElementById('popup');
    if (e.target == popup) {
        popup.style.display = 'none';
    }
});
