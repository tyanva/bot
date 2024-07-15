

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

canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;
const specialRow = 1;   // Донат поля

const cellSize = gameWidth/8;
const roadSize = cellSize / 4;
const totalCellSize = cellSize + roadSize; // размер тайла + дороги


// Габориты поля
const gridCol = 5; 
const gridRow = 5 + specialRow; 
var buildings = []; // Массив домов
/*
// Отправка данных по строениям на сервер

const buildingCoordinates = [
    { id: 1, x: 100, y: 200 },
    { id: 2, x: 300, y: 400 },
    // Add more coordinates as needed
];

function sendCoordinatesToBackend(allBuildingsData) {
    
let buildingsData = [];
allBuildingsData.forEach(item => {
    buildingsData.push({ x: 100, y: 200 })
});


fetch('/api/coordinates', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ buildingsData: buildingsData }),
})
.then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Call the function to send coordinates
sendCoordinatesToBackend(buildingCoordinates);
*/
canvas.width = totalCellSize * gridCol - roadSize;
canvas.height = totalCellSize * gridRow - roadSize;


//Добавить новое здание
function createBuild(build,x,y,img) {
    img = buildingImage;
    const item = {
        id:x*gridCol + y,     //Max 25 + 10
        x:x,
        y:y,
        skin: new Image(),
        sell_price:300,
        profit:125,
        text:'text',        
    }
    item.skin = img;
    build.push(item);
    //build.id = build.x * gridCol + build.y; // ID - номер блока 
}
createBuild(buildings,0,2)
createBuild(buildings,3,1)
createBuild(buildings,1,1)
createBuild(buildings,0,0)


//разбор json 
function getCoordinates(array) {
    const coordinates = [];
    array.forEach(value => {
      if (value.id >= gridCol * gridRow) {
        console.log(`Значение ${value} выходит за пределы сетки`);
        return;
      }
      const x = value.id % gridCol;
      const y = Math.floor(value.id / gridCol);
      coordinates.push({ x:x, y:y });
    });
    return coordinates;
  }

const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0, t=0; row < gridRow; row++) {
        for (let col = 0; col < gridCol; col++) {
            const x = col * totalCellSize;
            const y = row * totalCellSize;
            ctx.drawImage(cellImage, x, y, cellSize, cellSize);
            //console.log("Cell-",t++,";  X - ", x, "; Y - ", y,";")


            // Рисуем горизонтальные дороги
            if (col < gridCol - 1) {
                ctx.drawImage(roadHorizontalImage, x + cellSize, y, roadSize, cellSize);
            }

            // Рисуем вертикальные дороги
            if (row < gridRow - 1) {
                ctx.drawImage(roadVerticalImage, x, y + cellSize, cellSize, roadSize);
            }

            // Рисуем перекрестки
            if (col < gridCol - 1 && row < gridRow - 1) {
                ctx.drawImage(intersectionImage, x + cellSize, y + cellSize, roadSize, roadSize);
            }
        }
    }

    buildings.forEach(building => {
        const x = building.x * totalCellSize;
        const y = building.y * totalCellSize;
        console.log("Cell-","t++",";  X - ", x, "; Y - ", y,";")

        ctx.drawImage(building.skin, x, y, cellSize, cellSize);

    });
};

// координаты курсора
document.addEventListener('DOMContentLoaded', (event) => {


    // Функция для очистки канваса
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Функция для рисования координат
    function drawCoordinates(x, y) {
        drawGrid()
        
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`X: ${Math.floor(x)}, Y: ${Math.floor(y)}`, 10, 30);

    }

    // Обработчик события движения мыши
    canvas.addEventListener('click', (event) => {
        clearCanvas();
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        drawCoordinates(x, y);
    });
});
