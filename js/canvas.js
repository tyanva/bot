// canvas.js

const skins = [
    { path: '../assets/skin_building_1.png', name: 'Basic Skin' },
    { path: '../assets/skin_building_2.png', name: 'Advanced Skin' },
    { path: '../assets/skin_building_3.png', name: 'Pro Skin' },
    { path: '../assets/skin_building_4.png', name: 'Elite Skin' },
];

export function initializeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const buildingImages = [];
    const cellImage = new Image();
    cellImage.src = '../assets/cell.png';
    
    skins.forEach(skin => {
        const img = new Image();
        img.src = skin.path;
        buildingImages.push(img);
    });

    const cellSize = 100;
    const gridSize = 5;
    const buildings = [];
    let selectedSkin = 0;

    canvas.width = cellSize * gridSize;
    canvas.height = cellSize * gridSize;

    cellImage.onload = () => {
        drawGrid();
    };

    const drawGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                ctx.drawImage(cellImage, col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
        buildings.forEach(building => {
            ctx.drawImage(buildingImages[building.skin], building.col * cellSize, building.row * cellSize, cellSize, cellSize);
        });
    };

    const highlightCell = (col, row) => {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    };

    canvas.addEventListener('mousemove', (e) => {
        drawGrid();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        highlightCell(col, row);
    });

    canvas.addEventListener('mouseleave', () => {
        drawGrid();
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        const existingBuilding = buildings.find(building => building.col === col && building.row === row);
        const popup = document.getElementById('popup');

        if (existingBuilding) {
            popup.style.display = 'block';
            document.getElementById('buildButton').style.display = 'none';
            document.getElementById('freeButton').style.display = 'none';
            document.getElementById('sellButton').style.display = 'block';
            document.getElementById('skinList').style.display = 'none';

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
            document.getElementById('skinList').style.display = 'none';

            const buildButton = document.getElementById('buildButton');
            buildButton.onclick = () => {
                displaySkins();
            };

            const freeButton = document.getElementById('freeButton');
            freeButton.onclick = () => {
                buildings.push({ col, row, skin: selectedSkin });
                drawGrid();
                popup.style.display = 'none';
            };
        }
    });

    // Close popup on outside click
    window.addEventListener('click', (e) => {
        const popup = document.getElementById('popup');
        if (e.target == popup) {
            popup.style.display = 'none';
        }
    });

    // Close popup on close button click
    document.getElementById('closePopupCanvas').addEventListener('click', () => {
        document.getElementById('popup').style.display = 'none';
    });

    function displaySkins() {
        const skinList = document.getElementById('skinList');
        skinList.innerHTML = '';
        skins.forEach((skin, i) => {
            const skinItem = document.createElement('div');
            skinItem.className = 'skin-item';
            skinItem.innerHTML = `<img src="${skin.path}" alt="${skin.name}"><span>${skin.name}</span>`;
            skinItem.addEventListener('click', () => {
                selectedSkin = i;
                document.getElementById('freeButton').click();
            });
            skinList.appendChild(skinItem);
        });
        document.getElementById('buildButton').style.display = 'none';
        skinList.style.display = 'block';
    }
}

// Prevent scroll with multiple touch points
document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });
