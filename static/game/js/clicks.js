export function checkClick(event, blocks, canvas) {
    //записывает координаты клика
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        blocks[0].fallingFlag = true;
        console.log("Click +" );
    }
}
