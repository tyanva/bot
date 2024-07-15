import * as consts from './consts.js';
import { animation, playAnimation } from './animation.js';
import { renderBlocks, renderGround, renderRope,renderHook, renderBackground, drawChart,clear} from './canvas.js';
import { addBlock, moveDown, moveDownUpd, shakingUpd } from './blocks.js';
import { setGround } from './ground.js';
import { calcRope } from './rope.js';
import { createBackground } from './background.js';
import { checkClick} from './clicks.js';
import { comparisonBorder, comparisonBlocks} from './comparison.js';
import * as draw from './ui.js';
export const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размер canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const background = createBackground(canvas); // Создание rope/hook
const hook = calcRope(canvas ); // Создание rope/hook

var isPerf = '';
var score = 0;
var hearts = 3;
var progressTime = 0;

export function oddHeart() {
    hearts--;
}

export function perfect(times) {
    //isPerf='+'+times;
}

//timer
const uiBlocks = {
    timer:  new Image(),
}

uiBlocks.timer= consts.timer_src;

export function updTime (time) {
    progressTime = time;
}

export function addScore(BP,times) {
    const bonus = BP+times;
    perfect(times)
    return score+=bonus;        //поч ретерн?
}

export function getScore() {
    return score;
}

let floors = 0;
export function addFloors() {
    return floors++;
}

export function getFloors() {
    return floors;
}
let isMenuVisible = false;

// Инициализируем объекты
const blocks = [];                  
export const groundBlock = setGround();//Палтформа земли
addBlock(blocks);
    
//Game loop body
(function() {
    // Временные переменные
    let lastTime = 0;
    const fps = consts.fps;
    const interval = 1000 / fps;

    function gameLoop(time) {
        // Рассчитываем прошедшее время с последнего кадра
        const deltaTime = time - lastTime;

        if (deltaTime > interval) {
            // Сохраняем текущее время для следующего кадра
            lastTime = time - (deltaTime % interval);
            
            if(!isMenuVisible)
            update();
            // Обновление состояния игры
        }   
        requestAnimationFrame(gameLoop);
    }
    
    // Запуск игрового цикла
    requestAnimationFrame(gameLoop);
})();



function update() {
    clear(canvas);      
    background.update();   
    
    if(floors!==0){
        comparisonBlocks(blocks[0],blocks[1]);

    }
   
    //Падает
    if (blocks[0].fallingFlag) {
        comparisonBorder(blocks[0],groundBlock); // Проверка столкновения с нижней границей 
    }

    //Фейл - Промах
    if(blocks[0].failedFlag){
        //Стоп тайм Мулт
    }
    if(!blocks[0].fallingFlag){}//какой то инстал    

    // Проверка, нужно ли создать новый блок
    if(blocks[0].createFlag){
        addBlock(blocks);

        // Удалять старый после лимита блоков
        if(blocks.length>consts.block_limit+1){
            blocks.pop();
        }

        // 
        if(blocks.length >= consts.block_limit){
            moveDown(blocks[1]);
            moveDown(blocks[2]);
            moveDown(blocks[3]);
            if(blocks.length>consts.block_limit)
                moveDown(blocks[4]);
            background.moving=true;
        }
    }

    //Опускаем плавно блоки вниз
    if(blocks.length >= consts.block_limit){
        moveDownUpd(blocks[1]);
        moveDownUpd(blocks[2]);
        moveDownUpd(blocks[3]);
        if(blocks.length>consts.block_limit)
            moveDownUpd(blocks[4]);
    }
    // Апдейт rope
    hook.update();

    //delet
    blocks.slice(1).forEach(block => { 
        //block.shakingBlocks(canvas);
    });

    // Апдейт block - hook  
    blocks[0].update(hook.endX, hook.endY);
    
    shakingUpd(blocks,canvas)
    
    if(floors>=3 && groundBlock.y<=canvas.height){
        groundBlock.y+=consts.movingDownSpeedBg; 
        if(!(floors>=3 && groundBlock.y<=canvas.height))// Опускает землю на еще ниже экрана, чтобы блок улетал за экран. 
            groundBlock.y+=consts.block_h*1.2;          // Позже, будет анимация(разрушение), которую будет триггерить земля невидимая, выше нижней границы. 
    }

    if( hearts<=0)
    {
    isMenuVisible = !isMenuVisible;
        //Seve data and show score

        
    }
    if(floors>=consts.contract_size) {
    isMenuVisible = !isMenuVisible;

        window.location.href = `/city`;
    }
    
    // Rendering
    renderBackground(canvas, background);
    renderRope(ctx,hook);
    renderHook(ctx,hook);
    renderGround(ctx, groundBlock);
    renderBlocks(ctx, blocks);
    drawChart(canvas, progressTime, 30, canvas.width-75, 150);
    //UI
    draw.drawHearts(canvas,ctx, hearts)
    draw.drawFloor(canvas,ctx,floors);
    draw.drawScore(canvas,ctx,score);
    draw.drawPerf(canvas,ctx,isPerf);
    hook.drawState(ctx);
}


//Пока ничего не делает
playAnimation(false);

//  //  //  Ivents
canvas.addEventListener('click', function(event) {
    if(!blocks[0].fallingFlag)
        checkClick(event, blocks, canvas);
});

canvas.addEventListener('P', function(event) {
    if(!blocks[0].fallingFlag)
        checkClick(event, blocks, canvas);
});


document.getElementById('toggleButton').addEventListener('click', toggleBlock);

document.getElementById('backGame-btn').addEventListener('click', toggleBlock);


// Функция для скрытия/отображения блока
function toggleBlock() {
    const overlay = document.getElementById('overlay');
    isMenuVisible = !isMenuVisible;
    if (overlay.style.display === 'none' || overlay.style.display === '') {
        overlay.style.display = 'flex';
        toggleButton.style.display = 'none';
    } else {
        overlay.style.display = 'none';
        toggleButton.style.display = 'flex';
    }
}
function updateButtonPosition() {
    const canvasRect = canvas.getBoundingClientRect();
    menuBlock.style.width = (canvasRect.width*0.4) + 'px';
    toggleButton.style.top = (canvasRect.top + 10) + 'px';
    toggleButton.style.left = (canvasRect.right - toggleButton.offsetWidth - 10) + 'px';
    
}

// Изначально обновляем позицию кнопки
updateButtonPosition();

