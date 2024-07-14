import * as consts from './consts.js';
import { canvas } from './main.js';

//Ф-я создания первой площадки
export function setGround() {
    const ground = 
        {
            width: canvas.width,  
            height: consts.ground_h, 
            x:0,
            y:canvas.height-consts.ground_h,
            skin_src: new Image(),  
        };
        
        ground.skin_src.src = consts.ground_block_src;

    return ground;
}
