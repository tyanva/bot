import * as consts from './consts.js';
import {getFloors } from './main.js';

export function createBackground(canvas) {
    const bg = {
        x: 0, 
        y: 0, 
        w: canvas.width, 
        h: consts.block_h*consts.contract_size,          
        skin_src:   new Image(),
        moving: false,
        oldPos: 0,
        
        update: function() {
            if(this.moving){
                this.y += consts.movingDownSpeedBg;

                if(this.y>=this.oldPos+consts.backgroundDelta){
                    this.y=this.oldPos+consts.backgroundDelta;
                    this.moving=false;
                }
            } else {
                this.oldPos=this.y;
            }
        },
    };

    bg.y = -bg.h + canvas.height;
    bg.skin_src.src = consts.background_src;

    return bg;
}

