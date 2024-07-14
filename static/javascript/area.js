const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cellImage = new Image();
const buildingImage = new Image();
const roadHorizontalImage = new Image();
const roadVerticalImage = new Image();
const intersectionImage = new Image();

cellImage.src = '../static/images/cell.png';
buildingImage.src = '../static/images/building.png';
roadHorizontalImage.src = '../static/images/road-horizontal.png';
roadVerticalImage.src = '../static/images/road-vertical.png';
intersectionImage.src = '../static/images/q.png';

const cellSize = 100;
const roadSize = cellSize * 0.2;
const gridSize = 5;
const buildings = [];

const totalCellSize = cellSize + roadSize; // размер тайла + дороги

canvas.width = totalCellSize * gridSize - roadSize;
canvas.height = totalCellSize * gridSize - roadSize;

let imagesLoaded = 0;
const totalImages = 4;

const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        drawGrid();
    }
};

const imageLoadError = (src) => {
    console.error(`Ошибка загрузки изображения: ${src}`);
};

cellImage.onload = imageLoaded;
cellImage.onerror = () => imageLoadError(cellImage.src);

buildingImage.onload = imageLoaded;
buildingImage.onerror = () => imageLoadError(buildingImage.src);

roadHorizontalImage.onload = imageLoaded;
roadHorizontalImage.onerror = () => imageLoadError(roadHorizontalImage.src);

roadVerticalImage.onload = imageLoaded;
roadVerticalImage.onerror = () => imageLoadError(roadVerticalImage.src);

intersectionImage.onload = imageLoaded;
intersectionImage.onerror = () => imageLoadError(intersectionImage.src);

const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = col * totalCellSize;
            const y = row * totalCellSize;
            ctx.drawImage(cellImage, x, y, cellSize, cellSize);

            // Рисуем горизонтальные дороги
            if (col < gridSize - 1) {
                ctx.drawImage(roadHorizontalImage, x + cellSize, y, roadSize, cellSize);
            }

            // Рисуем вертикальные дороги
            if (row < gridSize - 1) {
                ctx.drawImage(roadVerticalImage, x, y + cellSize, cellSize, roadSize);
            }

            // Рисуем перекрестки
            if (col < gridSize - 1 && row < gridSize - 1) {
                ctx.drawImage(intersectionImage, x + cellSize, y + cellSize, roadSize, roadSize);
            }
        }
    }
    buildings.forEach(building => {
        const x = building.col * totalCellSize;
        const y = building.row * totalCellSize;
        ctx.drawImage(buildingImage, x, y, cellSize, cellSize);
    });
};

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
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const col = Math.floor(x / totalCellSize);
        const row = Math.floor(y / totalCellSize);

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
                window.location.href = './Game/index.html';
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
