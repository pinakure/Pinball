var shift_on = false;
var ctrl_on  = false;
var alt_on   = false;

function  getMousePos(evt) {
    var canvas = Screen.node;
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    if( Editor.snap_to_grid ){
        return {
            x: parseInt(parseInt((evt.clientX - rect.left) * scaleX )/Editor.grid_size)*Editor.grid_size, 
            y: parseInt(parseInt((evt.clientY - rect.top ) * scaleY )/Editor.grid_size)*Editor.grid_size, 
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
            var node = document.getElementById('boss');
            Game.boss_screen ^= 1;
            if(Game.boss_screen){
                node.setAttribute('style', '');
            } else {
                node.setAttribute('style', 'display: none');
                Display.text.blink(`Boss Screen ${Game.boss_screen ? 'en' : 'dis' }abled`, BLINK_MODE_FAST, 1000, DISPLAY_MODE_SCORE);
            }
            break;
        default: 
            if(Editor.initialized){
                for(key in Infobar.tools){
                    var info = Infobar.tools[key];
                    if(event.keyCode == info.keycode) {
                        Infobar.selectTool(`${key}`);
                        return;            
                    }
                }
                for(key in Infobar.toggles){
                    var info = Infobar.toggles[key];
                    if(event.keyCode == info.keycode) {
                        toggle(`${key}`);
                        return;            
                    }
                }
            }
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
