import * as consts from './consts.js';

export function calcRope(canvas) {
    const ctx = canvas.getContext('2d');

    const rope = {
        x: canvas.width / 2,            // Начальная позиция крюка по горизонтали
        y: consts.rope_y,               // Начальная позиция крюка по вертикали
        endX: 0,                        // Конечная позиция крюка по горизонтали
        endY: 0,                        // Конечная позиция крюка по вертикали
        length: consts.rope_l,          // Длина крюка
        speed: consts.rope_speed,       // Скорость изменения угла
        angle: 0,                       // Начальный угол наклона крюка
        maxAngle: consts.rope_maxAngle, // Максимальный угол отклонения
        skin_src: new Image(),
        cycles: 0,                      // Количество полных циклов качания
        windDirection: 1,               // Направление ветра (1 - вправо, -1 - влево)
        windCycleCount: getRandomInt(3, 5), // Случайное количество циклов перед сменой направления ветра
        windStrength: 0.01,             // Сила ветра

        update: function() {
            this.angle += this.speed + this.windStrength * this.windDirection;
            
            if (this.angle > this.maxAngle || this.angle < -this.maxAngle) {
                this.speed = -this.speed; // Изменение направления движения
                this.cycles++;
                if (this.cycles >= this.windCycleCount) {
                    this.windDirection *= -1; // Смена направления ветра
                    this.cycles = 0; // Сброс счетчика циклов
                    this.windCycleCount = getRandomInt(3, 6); // Новое случайное количество циклов
                }
            }
            this.endX = this.x + Math.sin(this.angle) * this.length;
            this.endY = this.y + Math.cos(this.angle) * this.length;

        },

        drawState: function(ctx) {
            ctx.fillStyle = 'black';
            ctx.font = '14px Arial';
            //ctx.fillText(`Angle: ${this.angle.toFixed(2)}`, canvas.width - 140, 20);
            ctx.fillText(`Next Wind Change: ${this.windCycleCount - this.cycles}`, canvas.width - 240, 40);
            //ctx.fillText(`Cycles: ${this.windCycleCount}`, canvas.width - 140, 60);
            ctx.fillText(`Wind Dir: ${this.windDirection === 1 ? 'Right' : 'Left'}`, canvas.width - 110, 80);
        }
    };
    rope.skin_src.src = consts.hook_skin_src;

    return rope;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
