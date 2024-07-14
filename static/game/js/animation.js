import * as consts from './consts.js';

// Пока не активно

let isAnimationEnabled = false; // Флаг для управления анимацией
export function animation(canvas) {
    const context = canvas.getContext('2d');
    const animationCanvas = document.createElement('canvas');
    
    function renderFrame(renderContext, frame) {
        if (!isAnimationEnabled) return; // Останавливаем выполнение если анимация отключена

        animationCanvas.width = frame.width;
        animationCanvas.height = frame.height;
        
        renderContext.drawImage(frame.buffer, 0, 0);
        context.drawImage(animationCanvas, canvas.width / 2 - consts.block_w / 2, 0, consts.block_w, consts.block_h);
    }

    gifler('./static/img/crash_animation.gif')
        .frames(animationCanvas, renderFrame);
        
}
   // Функция для отключения анимации
   export function playAnimation(status) {
    isAnimationEnabled = status;
};