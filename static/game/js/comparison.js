import * as consts from './consts.js';
import {addFloors, getFloors, addScore, oddHeart, perfect,updTime } from './main.js';
const accuracyLevel_1 = 50;
const accuracyLevel_2 = 75;
const accuracyLevel_3 = 85;
const accuracyPerf = 95;

var multiplierTime = 0;
var times=0;

    // попал ли на границу
    export function comparisonBorder(fallingBlock, ground) {
        if (fallingBlock.y + fallingBlock.height >= ground.y) {

            if(getFloors()==0){
                addFloors();
                fallingBlock.createFlag=true;
            } 
            else if (fallingBlock.y + fallingBlock.height >= ground.y){ //fallingBlock.y + fallingBlock.height >= ground+consts.block_h/2
                fallingBlock.fallingFlag=false;
                oddHeart();
            }
        } 
    }

    // Функция для проверки пересечения блоков
    export function comparisonBlocks (fallingBlock, staticBlock) { // Индексы блоков [0] и [1]
        if(multiplierTime>0) {
            multiplierTime--;
        } else  if(multiplierTime<0){multiplierTime=0;}

        // Проверка пересечения блоков
        if (fallingBlock.y + fallingBlock.height > staticBlock.y &&
            fallingBlock.x < staticBlock.x + staticBlock.width &&
            fallingBlock.x + fallingBlock.width > staticBlock.x) 
            {                
                // Процент пересечения блоков
                const overlapStart = Math.max(fallingBlock.x, staticBlock.x);
                const overlapEnd = Math.min(fallingBlock.x + fallingBlock.width, staticBlock.x + staticBlock.width);
                const overlapWidth = overlapEnd - overlapStart;
                const overlapPercentage = (overlapWidth / fallingBlock.width) * 100;

                //Мнимальный порог пересеяения для установки блока друг на друга
                if (overlapPercentage >= accuracyLevel_1){
                    addFloors();
                    fallingBlock.createFlag=true;
                    fallingBlock.y = staticBlock.y - fallingBlock.height;
                } 

                let buildPoint = 0; //Поинты за точность устоновки

                // Расчет баллов 
                if (overlapPercentage >= accuracyPerf) {
                    fallingBlock.x=staticBlock.x;// выравнивание блока
                    perfect();

                    buildPoint = 4;
                    if(multiplierTime>0){
                        multiplierTime = consts.max_multiplier;
                        times++;
                    } else {
                        multiplierTime = consts.max_multiplier;
                        times=0;                       
                    }
                } else if (overlapPercentage >= accuracyLevel_3) {
                    buildPoint = 3;
                    if(multiplierTime>0){
                        multiplierTime = consts.max_multiplier;
                        times++;
                    } else {
                        multiplierTime = consts.max_multiplier;
                        times=0;                       
                    }
                } else if (overlapPercentage >= accuracyLevel_2) {
                    buildPoint = 2;
                    if(multiplierTime>0){
                        multiplierTime = consts.max_multiplier;
                        times++;
                    } else {
                        multiplierTime = consts.max_multiplier;
                        times=0;                       
                    }
                } else if (overlapPercentage >= accuracyLevel_1) {
                    buildPoint = 1;
                    multiplierTime = 0;                     
                    times=0;
                } else {
                    buildPoint = 0;
                }    
                
                addScore(buildPoint,times);
                console.log("+",buildPoint,'BP point')
                console.log("+",times,' times point')
            }

            if(multiplierTime>0)
                {
                    const progressTime = 1 - multiplierTime/(consts.max_multiplier);
                    updTime(progressTime);
                } 
                else  updTime(0);          
    }

