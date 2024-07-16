import * as consts from './consts.js';
import {getFloors } from './main.js';

export function createBackground(canvas) {
    const bg = {
        x: 0, 
        y: 0, 
        w: canvas.width, 
        h: consts.block_h*consts.contract_size+consts.block_h*3,          
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
    bg.w = bg.h*0.3;
    if(bg.w>canvas.width)
    {
        bg.x = -(bg.w-canvas.width)/2
    } 
    bg.y = -bg.h + canvas.height;
    bg.skin_src.src = consts.background_src;

    return bg;
}

