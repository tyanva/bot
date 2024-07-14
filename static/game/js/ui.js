// ui.js
import {textSize} from './consts.js';

// Hearts
export function drawScore(canvas, ctxui, score) {
    const text = 'Score';
    const height = canvas.height/20*textSize;

    ctxui.save();
    ctxui.font = `${height}px Arial`;
    ctxui.fillStyle = 'black';
    ctxui.textAlign = 'left';
    ctxui.fillText(`${text} ${score}`, 10, height);
    ctxui.restore();
}

// Counter
export function drawFloor(canvas, ctxui, count) {
    const text = 'Floor';
    const height = canvas.height/20*textSize;

    ctxui.save();
    ctxui.font = `${height}px Arial`;
    ctxui.fillStyle = 'black';
    ctxui.textAlign = 'left';
    ctxui.fillText(`${text} ${count}`, 10, height*2+10);
    ctxui.restore();
}

// Hearts
export function drawHearts(canvas, ctxui, hp) {
    const text = 'HP: ';
    const height = canvas.height/20*textSize;
    
    ctxui.save();
    ctxui.font = '20px Arial';
    ctxui.fillStyle = 'black';
    ctxui.textAlign = 'left';
    ctxui.fillText(`${text} ${hp}`, 10, height*2+40);
    ctxui.restore();
}
// Hearts
export function drawPerf(canvas, ctxui, isPerf) {
    
        const text = isPerf;
        ctxui.save();
        ctxui.font = '80px Arial';
        ctxui.fillStyle = 'black';
        ctxui.textAlign = 'center';
        ctxui.fillText(`${text}`, canvas.width / 2, canvas.height / 2);
        ctxui.restore();
    
}
