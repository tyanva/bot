// ui.js
export function drawCounter(ctxui, count) {
    ctxui.save();
    ctxui.font = '20px Arial';
    ctxui.fillStyle = 'black';
    ctxui.textAlign = 'left';
    ctxui.fillText(`Blocks: ${count}`, 10, 30);
    ctxui.restore();
}
