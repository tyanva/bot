// Sources
export const block_skin_src =           'static/game/img/block_type_2.png'
export const crash_animation_src =      'static/game/img/crash_animation.gif'
export const falling_animation_src =    'static/game/img/falling_animation.gif'
export const ground_block_src =         'static/game/img/beton.png'
export const hook_skin_src =            'static/game/img/hook.png'
export const background_src =           'static/game/img/long_bg.png'
export const timer_src =                'static/game/img/timer.svg'

// Сервер присылает переменные в зависимости от улчшений
//upgrades var
export var wind_mod = 1.0;
export var rope_speed_mod = 1.0;
export var rope_l_mod = 1.0;


function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
// Получение contractId из URL
const contractId = getUrlParameter('contract');


//Global 
export var fps = 60;                    //
export var headers = 3;                 //
export const contract_size = contractId;// Макс ысота постройки
export const start_shaking = 0;         // Макс ысота постройки

//UI
export var textSize = 0.5;

//block
export var block_limit = 4;
export var block_w = (window.innerHeight/8)*0.9;
export var block_h = (window.innerHeight/8);
export var block_speed = 8;
export var block_angle = 0;                             // начальный угол
export const block_maxTiltAngle = Math.PI / (12 * 9);   // максимальный угол наклона 
export const maxOffset = (window.innerWidth) * 0.1;     // 10% от ширины canvas
export const angularSpeed = 0.000;                       // угловая скорость

const coefMovingBG = 0.5; // под вопросом ???
//ground
export var ground_h = block_h/4;
export var movingDownSpeedGround = block_h / fps * coefMovingBG  ; // скорость движения земли

//background
export var movingDownSpeedBg = block_h / fps * coefMovingBG  ; // скорость движения фона
export var backgroundDelta = block_h/2; //высот сдвига фон


//rope
export var rope_y = -window.innerHeight/8;
export const rope_l = block_h*2*rope_l_mod;
export var rope_speed = 0.03;
export var rope_maxAngle = 0.75;


//moving blocks
export var wind = wind_mod * 1;
export var movingDownSpeedBlock = block_h / fps * 2; //скорость движения блоков при сдвиге фона

//multiplier
export const max_multiplier = fps * 2;
export const up_multiplier = 1;