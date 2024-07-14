import * as consts from './consts.js';

// muving
export function moveDownBlocks() {
    const move = {
        windX:          false,
        backgroundY:    false,
        blocksY:        false,
    }
}

export function backgroundY (background) {
    background.y+=consts.backgroundDelta;
}

export function moveBlockY ( blocks) {
    blocks.forEach((block, index) => {
        if(index !==0)
        block.y+=consts.block_h;
    });
}

export function windX ( ) {

}