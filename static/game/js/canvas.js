import * as consts from './consts.js';
import {deltaX , angle} from './blocks.js'
// Функция для отрисовки блоков на canvas
export function renderBlocks(context, blocks) {
    for (let i = blocks.length - 1; i >= 0; i--)
    context.drawImage(blocks[i].skin_src, blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
    /*
    blocks.forEach((block, index) => {
        context.save();
        
        if (!index == 0 && blocks.length>consts.start_shaking) {
            // Трансформация для остальных элементов
            context.translate(deltaX+block.x + block.width / 2, block.y + block.height / 2);
            context.rotate(consts.block_maxTiltAngle * Math.sin(angle));
            context.translate(-block.width / 2, -block.height / 2);
            context.drawImage(blocks[index].skin_src, 0, 0, blocks[index].width, blocks[index].height);
        } 
        if(index == 0 && blocks.length) {
            // Просто отрисовка первого элемента
            context.drawImage(blocks[index].skin_src, blocks[index].x, blocks[index].y, blocks[index].width, blocks[index].height);
        }
        context.restore(); 
    });
    */
}  

// Функция для отрисовки rope
export function renderRope(context, rope) {
    context.beginPath();
    context.moveTo(rope.x, rope.y); // Начало линии крюка
    context.lineTo(rope.endX, rope.endY); // Конец линии крюка
    context.stroke();
    context.save();
    context.translate(rope.endX, rope.endY); // Перемещение системы координат к концу крюка
    context.restore();
}

// Функция для отрисовки hook
export function renderHook(context, hook){
    const hook_w = 80;
    const hook_h = 50;

    context.drawImage(hook.skin_src,hook.endX-25, hook.endY, hook_h, hook_w);
} 

// Функция для отрисовки ground на canvas
export function renderGround(context, ground) {
    context.drawImage(ground.skin_src, ground.x, ground.y, ground.width, ground.height);           
}

let d = 0;
// Функция для отрисовки background на canvas
export function renderBackground(canvas, background) {
    const context = canvas.getContext('2d');

    context.drawImage(background.skin_src, background.x,background.y,background.w, background.h);       
}

export function clear(canvas){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
} 

export function drawChart(canvas ,progress, size, positionX, positionY) {
                const ctx = canvas.getContext('2d');
                
                ctx.beginPath();
                ctx.moveTo(positionX + size, positionY + size); // Adjusting moveTo for center
                ctx.arc(
                    positionX + size,
                    positionY + size,
                    size,
                    -Math.PI / 2,
                    -Math.PI / 2 - (Math.PI * 2 * progress),
                    true
                );
                ctx.lineTo(positionX + size, positionY + size); // Adjusting lineTo for center
                ctx.fillStyle = '#4caf50'; // Color of the chart
                ctx.fill();
            };
            
