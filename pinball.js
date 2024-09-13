const KEY_LEFT  = 37;
const KEY_RIGHT = 39;
const KEY_UP    = 38;
const KEY_DOWN  = 40;
const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_SCAPE = 27;

const BALL_DIRECTION_NONE   = 0x0;
const BALL_DIRECTION_DOWN   = 0x1;
const BALL_DIRECTION_UP     = 0x2;
const BALL_DIRECTION_LEFT   = 0x4;
const BALL_DIRECTION_RIGHT  = 0x8;

function handleKeyboard( event ){
    switch(event.keyCode){
        case KEY_ENTER:
            Game.update();
            break;
        case KEY_LEFT:
            break;
        case KEY_RIGHT:
            break;
        case KEY_UP:
            break;
        case KEY_DOWN:
            break;
        case KEY_SPACE:
            break;
        case KEY_SCAPE:
            break;
        default: 
            console.log( event.keyCode );
            return;
    }
    event.preventDefault();    
}

function boot( event ){
    document.addEventListener("keydown", handleKeyboard);
    Game.init();
}

document.addEventListener("DOMContentLoaded", function(event){ boot(event); });
