const canvas = document.getElementById('cityCanvas');
const ctx = canvas.getContext('2d');

const cellImage = new Image();
const buildingImage = new Image();
const roadHorizontalImage = new Image();
const roadVerticalImage = new Image();
const intersectionImage = new Image();

cellImage.src = '../static/images/cell.png';
buildingImage.src = '../static/images/h2.png';
roadHorizontalImage.src = '../static/images/road-horizontal.png';
roadVerticalImage.src = '../static/images/road-vertical.png';
intersectionImage.src = '../static/images/q.png';

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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;
let buildMode = true; // режим стройки
const specialRow = 1; // Донат поля

const cellSize = gameWidth / 8;
const roadSize = cellSize / 4;
const totalCellSize = cellSize + roadSize; // размер тайла + дороги

// Габариты поля
const gridCol = 5;
const gridRow = 5 + specialRow;
var buildings = []; // Массив домов
canvas.width = totalCellSize * gridCol - roadSize;
canvas.height = totalCellSize * gridRow - roadSize;

// Добавить новое здание
function createBuild(build, x, y, lvl) {
    
    img = buildingImage;
    const item = {
        id: x + y*gridCol, // Max 25 + 10
        x: x,
        y: y,
        lvl: lvl,
        skin: new Image(),
        sell_price: 300,
        profit: 125,
        text: 'text',
    }
    item.skin = img;
    build.push(item);
}
createBuild(buildings, 0, 2, 1)
createBuild(buildings, 3, 1, 1)
createBuild(buildings, 1, 1, 2)
createBuild(buildings, 0, 0, 3)

function getMaxLevelColor(maxLevel) {
    switch (maxLevel) {
        case 1:
            return 'rgba(0, 255, 0, 0.5)'; // зеленый с полупрозрачностью
        case 2:
            return 'rgba(255, 255, 0, 0.5)'; // желтый с полупрозрачностью
        case 3:
            return 'rgba(255, 0, 0, 0.5)'; // красный с полупрозрачностью
        case 4:
            return 'rgba(0, 0, 255, 0.5)'; // синий с полупрозрачностью
        default:
            return 'rgba(255, 255, 255, 0)'; // прозрачный, если уровень не определен
    }
}
const freeCells = getFreeCells();
const freeCellsWithMaxLevels = checkMaxBuildingLevel(freeCells);

function drawGrid() {

    for (let row = 0; row < gridRow; row++) {
        for (let col = 0; col < gridCol; col++) {
            const x = col * totalCellSize;
            const y = row * totalCellSize;

            // Рисуем дорогу
            if (col < gridCol - 1) {
                ctx.drawImage(roadHorizontalImage, x + cellSize, y, roadSize, cellSize);
            }
            if (row < gridRow - 1) {
                ctx.drawImage(roadVerticalImage, x, y + cellSize, cellSize, roadSize);
            }
            if (col < gridCol - 1 && row < gridRow - 1) {
                ctx.drawImage(intersectionImage, x + cellSize, y + cellSize, roadSize, roadSize);
            }

            // Рисуем клетку
            ctx.drawImage(cellImage, x, y, cellSize, cellSize);

            // Проверяем, если эта ячейка свободна, и красим её
            const freeCell = freeCellsWithMaxLevels.find(cell => cell.x === col && cell.y === row);
            if (freeCell) {
                ctx.fillStyle = getMaxLevelColor(freeCell.maxLevel);
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
    }

    // Рисуем здания
    for (let i = 0; i < buildings.length; i++) {
        const building = buildings[i];
        const x = building.x * totalCellSize;
        const y = building.y * totalCellSize;
        // draw color - 
        ctx.fillStyle = getMaxLevelColor(building.lvl);
        ctx.fillRect(x, y, cellSize, cellSize);
        // -
        ctx.drawImage(building.skin, x, y, cellSize, cellSize);
    }
}

// Обновленный вызов функции drawGrid() при загрузке изображений
drawGrid();

function getFreeCells() {
    const freeCells = [];

    for (let row = 0; row < gridRow; row++) {
        for (let col = 0; col < gridCol; col++) {
            let isOccupied = false;

            for (let i = 0; i < buildings.length; i++) {
                const building = buildings[i];
                if (building.x === col && building.y === row) {
                    isOccupied = true;
                    break;
                }
            }

            if (!isOccupied) {
                freeCells.push({ x: col, y: row });
            }
        }
    }

    return freeCells;
}

var availableContracts = 0;

// Функция для проверки соседей и определения максимального уровня здания
function checkMaxBuildingLevel(freeCells) {
    const directions = [
        { dx: 0, dy: -1 }, // вверх
        { dx: 0, dy: 1 },  // вниз
        { dx: -1, dy: 0 }, // влево
        { dx: 1, dy: 0 }   // вправо
    ];

    freeCells.forEach(cell => {
        let maxLevel = 1;
        let hasLevel1 = false;
        let hasLevel2 = false;
        let hasLevel3 = false;

        directions.forEach(dir => {
            const neighborX = cell.x + dir.dx;
            const neighborY = cell.y + dir.dy;

            if (neighborX >= 0 && neighborX < gridCol && neighborY >= 0 && neighborY < gridRow) {
                buildings.forEach(building => {
                    if (building.x === neighborX && building.y === neighborY) {
                        if (building.lvl === 1) hasLevel1 = true;
                        if (building.lvl === 2) hasLevel2 = true;
                        if (building.lvl === 3) hasLevel3 = true;
                    }
                });
            }
        });

        if (hasLevel1) maxLevel = 2;
        if (hasLevel1 && hasLevel2) maxLevel = 3;
        if (hasLevel1 && hasLevel2 && hasLevel3) maxLevel = 4;

        cell.maxLevel = maxLevel;
        availableContracts += 1; // Увеличиваем количество доступных контрактов
    });

    return freeCells;
}


console.log('Свободные ячейки с максимальным уровнем зданий:', freeCellsWithMaxLevels);
console.log('Количество доступных контрактов:', availableContracts);



/*
При выборе контр, надо проверить, максимальный ранг, 
если все ок, то списываем контракт при клике гейм и старт

// типа после игры
Сперва получим форму json? с результатом

вызовем чет для сообщения, что можно ткнуть дом
далее проверяем, какая ячейка подходит под наш контракт

Тыкаем по доступной ячейке и пушис параметрами. Когда скин ?

по курсору , если он попал клетку, уровень которой подходит
        x: x,
        y: y,
        lvl: lvl,
        skin: new Image(),
        sell_price: 300,
        profit: 125,
        text: 'text',

 */