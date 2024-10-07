function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

    return {
        x: parseInt((evt.clientX - rect.left) * scaleX ), // scale mouse coordinates after they have
        y: parseInt((evt.clientY - rect.top ) * scaleY ), // been adjusted to be relative to element
    }
}
const BUTTON = {
    MIDDLE : 4,
    RIGHT : 2,
    LEFT : 1,
};
var Screen = {
    width   : 240,
    height  : 320,
    node    : null,        
    context : null,
    data    : null,
    vertices : [],
    current_polygon : 0,
    polygon_position : {
        x : 0,
        y : 0,
    },

    init : function(){
        Screen.node     = document.getElementById( 'canvas' );
        Screen.context  = Screen.node.getContext( '2d' );
        Screen.data     = Screen.context.getImageData( 0, 0, Screen.width, Screen.height );
        Screen.update();
        document.getElementById('canvas').addEventListener('mousedown', Screen.handleClick);
        document.getElementById('canvas').addEventListener('mousemove', Screen.handleHover);
    },

    handleHover : function(event){
        if(Screen.vertices.length==0) return;
        
        const position = getMousePos(Screen.node, event);
        var vertices=[];
        for(v in Screen.vertices){
            vertices.push(Screen.vertices[v]);            
        }
        vertices.push(
            new Vertex(
                position.x - Screen.polygon_position.x, 
                position.y - Screen.polygon_position.y, 
            )
        );
        Table.geometry[Screen.current_polygon] = new Polygon(
            Screen.polygon_position.x, 
            Screen.polygon_position.y,
            [128,0,0],
            vertices,
            'new poly',
        );
        Table.draw();
        Screen.update();
        return false;
    },
    
    handleClick : function(event){
        
        
        const position = getMousePos(Screen.node, event);
        
        event.stopPropagation();  
        console.clear();
        console.log(position);
        switch(event.buttons){
            case BUTTON.LEFT: 
                if(Screen.vertices.length==0){
                    Screen.polygon_position.x = position.x;
                    Screen.polygon_position.y = position.y;
                }
                Screen.vertices.push( 
                    new Vertex(
                        position.x-Screen.polygon_position.x, 
                        position.y-Screen.polygon_position.y,
                    ) 
                );
                Table.geometry[Screen.current_polygon] = new Polygon(
                    Screen.polygon_position.x, 
                    Screen.polygon_position.y,
                    [255,0,0],
                    Screen.vertices,
                    'new poly',
                );
                break;

            case BUTTON.RIGHT: 
                if( shift_on ) Table.geometry[Screen.current_polygon].move(position.x, position.y);
                else Table.geometry[Screen.current_polygon].moveCenter(position.x, position.y);
                Screen.polygon_position.x = position.x;
                Screen.polygon_position.y = position.y;
                event.stopPropagation();
                event.preventDefault();
                break;

            case BUTTON.MIDDLE:                 
                Table.geometry[Screen.current_polygon] = new Polygon(
                    Screen.polygon_position.x, 
                    Screen.polygon_position.y,
                    [255,0,0],
                    Screen.vertices,
                    'new poly',
                );
                Screen.current_polygon++;
                Screen.vertices = new Array;
                break;
        };          
        Table.draw();
        Screen.update();
        return false;
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

    line : function(x,y,dx,dy,r=255,g=0,b=255){
        var points = Screen.getLine(x,y,dx,dy);
        for(pi in points){
            var point = points[pi];
            var x = point[0];
            var y = point[1];
            Screen.putPixel(x,y,r,g,b);
        }
    },
};