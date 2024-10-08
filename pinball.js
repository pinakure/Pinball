const BUTTON = {
    MIDDLE : 4,
    RIGHT : 2,
    LEFT : 1,
};

const KEY_LEFT  = 37;
const KEY_RIGHT = 39;
const KEY_UP    = 38;
const KEY_DOWN  = 40;
const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_SCAPE = 27;
const KEY_SHIFT = 16;
const KEY_CTRL  = 16;
const KEY_ALT   = 16;

const KEY_A     = 65;
const KEY_B     = 66;
const KEY_C     = 67;
const KEY_D     = 68;
const KEY_E     = 69;
const KEY_F     = 70;
const KEY_G     = 71;
const KEY_H     = 72;
const KEY_I     = 73;
const KEY_J     = 74;
const KEY_K     = 75;
const KEY_L     = 76;
const KEY_M     = 77;

const BALL_DIRECTION_NONE   = 0x0;
const BALL_DIRECTION_DOWN   = 0x1;
const BALL_DIRECTION_UP     = 0x2;
const BALL_DIRECTION_LEFT   = 0x4;
const BALL_DIRECTION_RIGHT  = 0x8;

var shift_on = false;
var ctrl_on  = false;
var alt_on   = false;

function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    if( Screen.snap_to_grid ){
        return {
            x: parseInt(parseInt((evt.clientX - rect.left) * scaleX )/4)*4, 
            y: parseInt(parseInt((evt.clientY - rect.top ) * scaleY )/4)*4, 
        }
    } else return {
        x: parseInt((evt.clientX - rect.left) * scaleX ), // scale mouse coordinates after they have
        y: parseInt((evt.clientY - rect.top ) * scaleY ), // been adjusted to be relative to element
    }
}

function handleKeyUp( event ){
    switch(event.keyCode){
        case KEY_SHIFT:
            shift_on = false;
            break;
        case KEY_CTRL:
            ctrl_on = false;
            break;
        case KEY_ALT:
            alt_on = false;
            break;
    }
}

function handleKeyDown( event ){
    switch(event.keyCode){
        case KEY_ENTER:
            if(Game.step_by_step) Game.update();
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
        case KEY_SHIFT:
            shift_on = true;
            break;
        case KEY_CTRL:
            ctrl_on = true;
            break;
        case KEY_ALT:
            alt_on = true;
            break;
        case KEY_B:
            var node = document.getElementsByClassName('boss')[0];
            Screen.boss_screen ^= 1;
            if(Screen.boss_screen){
                node.setAttribute('style', '');
            } else {
                node.setAttribute('style', 'display: none');
                Display.text.blink(`Boss Screen ${Screen.boss_screen ? 'en' : 'dis' }abled`, BLINK_MODE_FAST, 1000, DISPLAY_MODE_SCORE);
            }
            break;
        case KEY_G:
            Screen.snap_to_grid ^= 1;
            Display.text.blink(`Snap to grid ${Screen.snap_to_grid ? 'en' : 'dis' }abled`, BLINK_MODE_FAST, 1000, DISPLAY_MODE_SCORE);
            break;
        case KEY_M:
            
            break;
        default: 
            console.log( event.keyCode );
            return;
    }
    event.preventDefault();    
}

function boot( event ){
    document.addEventListener("keydown" , handleKeyDown);
    document.addEventListener("keyup"   , handleKeyUp);
    Game.init();
}

document.addEventListener("DOMContentLoaded", function(event){ boot(event); });
