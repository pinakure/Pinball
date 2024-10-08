const DISPLAY_MODE_ATTRACT  = 0x00;
const DISPLAY_MODE_TEXT     = 0x01;
const DISPLAY_MODE_GRAPHICS = 0x02;
const DISPLAY_MODE_SCORE    = 0x03;

const BLINK_MODE_FAST       = 'fast';
const BLINK_MODE_MEDIUM     = 'medium';
const BLINK_MODE_SLOW       = 'slow';

var Display = {

    mode        : DISPLAY_MODE_ATTRACT,
    next_mode   : DISPLAY_MODE_ATTRACT,

    canvas  : {

        node    : null,        
        context : null,
        data    : null,

        width   : 512,
        height  : 25,

        color   : {
            r : 245,
            g : 180,
            b : 0,
        },

        init : function(){
            Display.canvas.node     = document.getElementById( 'display_canvas' );
            Display.canvas.context  = Display.canvas.node.getContext( '2d' );
            Display.canvas.data     = Display.canvas.context.getImageData( 0, 0, Display.canvas.width, Display.canvas.height );
            //Display.canvas.putPixel(10,10,Display.canvas.color.r,Display.canvas.color.g,Display.canvas.color.b);
            Display.canvas.blit();
        },

        clear : function(){
            Display.canvas.context.clearRect(0, 0, canvas.width, canvas.height);
            Display.canvas.context.rect(0, 0, canvas.width, canvas.height);
            Display.canvas.context.fillStyle = color;
            Display.canvas.context.fill();
        },

        putPixel : function(x,y,r,g,b,a=255){
            var i = ((y*canvas.width)+x)*4;
            Display.canvas.data.data[ i ] = r;
            Display.canvas.data.data[i+1] = g;
            Display.canvas.data.data[i+2] = b;
            Display.canvas.data.data[i+3 ] = a;
        },

        getPixel : function(x,y){
            var i = ((y*canvas.width)+x)*4;
            return [ Display.canvas.data.data[i], Display.canvas.data.data[i+1],Display.canvas.data.data[i+2],Display.canvas.data.data[i+3] ]
        },
        
        blit : function(){
            Display.canvas.context.putImageData(Display.canvas.data,0,0);
        },
    },
    
    text : {
        
        node : null,
        text : '',

        hide : function(){

        },
        
        show : function(){

        },

        clear : function(){

        },

        blink : function(text, mode, time, next_mode){
            Display.switchMode(DISPLAY_MODE_TEXT);
            Display.next_mode = next_mode;
            Display.text.set(text);
            Display.text.node.className = `blink ${mode}`;
            setTimeout(function(){
                Display.text.node.className = '';
                Display.switchMode(Display.next_mode);
            }, time);
        },

        set : function( text ){
            Display.text.text = text;
            Display.text.node.value = text;
        },
    },

    init : function(){
        Display.canvas.init();
        Display.text.node       = document.getElementById('display_text');
        Display.text.blink("Start", BLINK_MODE_FAST, 1000, DISPLAY_MODE_SCORE);
        
    },
    
    attractMode : function(){

    },
    
    textMode : function(){

    },
    
    scoreMode : function(){

    },
    
    gfxMode : function(){

    },

    switchMode : function( mode ){
        switch( mode ){

            case DISPLAY_MODE_ATTRACT:
                Display.handler = Display.attractMode;
                break;
                
            case DISPLAY_MODE_TEXT:
                Display.handler = Display.textMode;
                Display.text.set( Display.text.text );
                break;
            
            case DISPLAY_MODE_SCORE:
                Display.handler = Display.scoreMode;
                Display.text.set( Game.score );
                break;
                
            case DISPLAY_MODE_GRAPHICS:
                Display.handler = Display.gfxMode;
                Display.canvas.clear();
                break;
            
            default:
                console.log(`Wrong mode requested: ${mode}`);
                return false;
        }
        console.log(`Switched mode to: ${mode}`);                
        Display.mode = mode;
    },
}
