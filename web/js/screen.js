var Screen = {
    width           : 240,
    height          : 320,
    node            : null,        
    context         : null,
    data            : null,
    
    init : function(){
        Screen.node     = document.getElementById( 'canvas' );
        Screen.context  = Screen.node.getContext( '2d' );
        Screen.data     = Screen.context.getImageData( 0, 0, Screen.width, Screen.height );
        Screen.update();
    },

    putPixel : function(x,y,r,g,b){
        if(x<0)return;
        if(y<0)return;
        if(x>=Screen.width)return;
        if(y>=Screen.height)return;
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

    getLine : function(x1,y1,x2,y2){
        var points = [];
        var dx = x2-x1;
        var dy = y2-y1;
        var i1, i2;
        var x, y;
        var dd;
    
        if (dx >= 0) {
            if (dy >= 0) {
                if (dx >= dy) {
                    if(dx == 0){
                        points.push([x1, y1]);
                        return;
                    }
                    
                    i1 = 2 * dy;
                    dd = i1 - (+ (+ dx));
                    i2 = dd - (+ (+ dx));
                    
                    x = x1;
                    y = y1;
                    
                    while (x <= x2) {
                        points.push([x, y]);
    
                        if (dd >= 0) {
                            y = y + 1;
                            dd += i2;
                        } else dd += i1;
                        
                        x = x + 1;
                    }
                } else {
                    if (dy == 0) {
                        points.push([x1, y1]);
                        return;
                    }
    
                    i1 = 2 * dx;
                    dd = i1 - (+ (+ dy));
                    i2 = dd - (+ (+ dy));
    
                    x = x1;
                    y = y1;
    
                    while (y <= y2) {
                        points.push([x, y]);
    
                        if (dd >= 0) {
                            x = x + 1;
                            dd += i2;
                        } else dd += i1;
                        
                        y = y + 1;
                    }
                }
            } else {
                if (dx >= -dy) {
                    if (dx == 0) {
                        points.push([x1, y1]);
                        return;
                    }
    
                    i1 = 2 * dy;
                    dd = i1 - (-(+dx));
                    i2 = dd - (-(+dx));
    
                    x = x1;
                    y = y1;
    
                    while (x <= x2) {
                        points.push([x,y]);
    
                        if (dd <= 0) {
                            y = y - 1;
                            dd += i2;
                        } else dd += i1;
                        
                        x = x + 1;
                    }
                }
                else {
                    if (dy == 0) {
                        points.push([x1,y1]);
                        return;
                    }
    
                    i1 = 2 * dx;
                    dd = i1 - (+ (- dy));
                    i2 = dd - (+ (- dy));
    
                    x = x1;
                    y = y1;
    
                    while (y >= y2) {
                        points.push([x,y]);
    
                        if (dd >= 0) {
                            x = x + 1;
                            dd += i2;
                        } else dd += i1;
                        
                        y = y - 1;
                    }
                }
            }
        } else {
            if (dy >= 0) {
                if (-dx >= dy) {
                    if (dx == 0) {
                        points.push([x1,y1]);
                        return;
                    }
    
                    i1 = 2 * dy;
                    dd = i1 - (+ (- dx));
                    i2 = dd - (+ (- dx));
    
                    x = x1;
                    y = y1;
    
                    while (x >= x2) {
                        points.push([x,y]);
    
                        if (dd >= 0) {
                            y = y + 1;
                            dd += i2;
                        } else dd += i1;
                        
                        x = x - 1;
                    }
                }
                else {
                    if (dy == 0) {
                        points.push([x1,y1]);
                        return;
                    }
    
                    i1 = 2 * dx;
                    dd = i1 - (- (+ dy));
                    i2 = dd - (- (+ dy));
    
                    x = x1;
                    y = y1;
    
                    while (y <= y2) {
                        points.push([x,y]);
    
                        if (dd <= 0) {
                            x = x - 1;
                            dd += i2;
                        } else dd += i1;
                        
                        y = y + 1;
                    }
                }
            } else {
                if (-dx >= -dy) {
                    if (dx == 0) {
                        
                        ([x1,y1]);
                        return;
                    }
    
                    i1 = 2 * dy;
                    dd = i1 - (- (- dx));
                    i2 = dd - (- (- dx));
    
                    x = x1;
                    y = y1;
    
                    while (x >= x2) {
                        points.push([x,y]);
    
                        if (dd <= 0) {
                            y = y - 1;
                            dd += i2;
                        } else dd += i1;
                        
                        x = x - 1;
                    }
                } else {
                    if (dy == 0) {
                        points.push([x1,y1]);
                        return;
                    }
    
                    i1 = 2 * dx;
                    dd = i1 - (- (- dy));
                    i2 = dd - (- (- dy));
    
                    x = x1;
                    y = y1;
    
                    while (y >= y2) {
                        points.push([x,y]);
    
                        if (dd <= 0) {
                            x = x - 1;
                            dd += i2;
                        } else dd += i1;
                        
                        y = y - 1;
                    }
                }
            }
        }
    
        return points;
    },

    line : function(x,y,dx,dy,r=255,g=0,b=255,offset_x=0, offset_y = 0){
        var points = Screen.getLine(x,y,dx,dy);
        for(pi in points){
            var point = points[pi];
            var x = point[0];
            var y = point[1];
            Screen.putPixel(offset_x+x,offset_y+y,r,g,b);
        }
    },
};