import * as consts from './consts.js';
export var angle = 0;
export var deltaX = 0;
// Создаем массив объектов block
export function addBlock(blocks) {
    const block = 
        {
            width: consts.block_w,  // 
            height: consts.block_h, // 
            x:0,
            y:0,
            skin_src:                   new Image(),
            falling_animation_src:      consts.falling_animation_src,
            crash_animation_src:        consts.crash_animation_src,
            fallingFlag: false,
            createFlag: false,
            failedFlag: false,
            moving:false,
            oldPos:0,                   // позиция для сравнения смещения
            
            update: function(x,y) {
                // падение
                if(this.fallingFlag){
                    this.y+=consts.block_speed;
                }

                //  Зацеп блока на веревке
                if(!this.fallingFlag){
                    this.y=y;
                    this.x=x-this.width/2;
                }
            },
        };

        block.skin_src.src = consts.block_skin_src;
           
        blocks.unshift(block);

}

export function shakingUpd(blocks,canvas) {
    angle += consts.angularSpeed;
    let offset = consts.maxOffset * Math.sin(angle);
    let tiltAngle = consts.block_maxTiltAngle * Math.sin(angle);

    blocks.forEach((block, index) => {
        if (!index == 0 && blocks.length>consts.start_shaking)
            deltaX = offset - (block.y - canvas.height + block.height) * Math.sin(tiltAngle);
    });
}

export function moveDown (block){    
    block.moving=true;
    block.oldPos=block.y;
}

export function moveDownUpd (block) {
    if(block.moving){
        // Двигаем блок вниз на шаг\скорость
        block.y += consts.movingDownSpeedBlock;

        // 
        if(block.y>=block.oldPos+consts.block_h){
            block.y=block.oldPos+consts.block_h;
            block.oldPos=0;
            block.moving=false;
        }
    }
}



