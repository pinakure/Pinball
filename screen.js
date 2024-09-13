var Screen = {
    width   : 240,
    height  : 320,
    node    : null,        
    context : null,
    data    : null,

    init : function(){
        Screen.node     = document.getElementById( 'canvas' );
        Screen.context  = Screen.node.getContext( '2d' );
        Screen.data     = Screen.context.getImageData( 0, 0, Screen.width, Screen.height );
        Screen.update();
    },

    putPixel : function(x,y,r,g,b){
        x = parseInt(x);
        y = parseInt(y);
        var i = ((y*Screen.width)+x)*4;
        Screen.data.data[ i ] = r;
        Screen.data.data[i+1] = g;
        Screen.data.data[i+2] = b;
        Screen.data.data[i+3] = 255;
    },
    
    getPixel : function(x,y){
        var i = ((y*Screen.width)+x)*4;
        return [ 
            Screen.data.data[i], 
            Screen.data.data[i+1],
            Screen.data.data[i+2],
            Screen.data.data[i+3] 
        ];
    },
    
    blit : function(){
        Screen.context.putImageData(Screen.data,0,0);
    },

    update : function(){
        Screen.blit();
        Screen.clear();
    },

    clear : function(){
        var i=0;
        for(var y=0; y<Screen.height; y++ ){
            for(var x=0; x<Screen.width; x++ ){
                Screen.data.data[ i ] = 0;
                Screen.data.data[i+1] = 0;
                Screen.data.data[i+2] = 0;
                Screen.data.data[i+3] = 0;
                i+=4;
            }
        }
    },
};