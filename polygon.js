function Vertex(x,y){
    this.x = x;
    this.y = y;
    this.active = false;
}

Vertex.prototype.touches = function(x,y,radius=1,polygon_x=0, polygon_y=0){
    var terms = [
        x-(this.x+polygon_x), 
        y-(this.y+polygon_y),
    ];
    var distance = Math.sqrt(
        ( terms[0] * terms[0] ) 
        + 
        ( terms[1] * terms[1] )
    );
    //console.log(polygon_x+this.x, polygon_y+this.y, x,y, distance);
    return distance <= radius;
}

Vertex.prototype.draw = function(offset_x, offset_y, r,g,b){
    r=this.active?255:r;
    g=this.active?255:g;
    b=this.active?255:b;
    Screen.putPixel(this.x+offset_x, this.y+offset_y, r, g, b);
    if(this.active || Screen.selection.vertex == this){
        Screen.putPixel(this.x+offset_x-1, this.y+offset_y-1, r, g, b);
        Screen.putPixel(this.x+offset_x+1, this.y+offset_y-1, r, g, b);
        Screen.putPixel(this.x+offset_x-1, this.y+offset_y+1, r, g, b);
        Screen.putPixel(this.x+offset_x+1, this.y+offset_y+1, r, g, b);
        Screen.putPixel(this.x+offset_x+1, this.y+offset_y, r, g, b);
        Screen.putPixel(this.x+offset_x-1, this.y+offset_y, r, g, b);
        Screen.putPixel(this.x+offset_x, this.y+offset_y+1, r, g, b);
        Screen.putPixel(this.x+offset_x, this.y+offset_y-1, r, g, b);    
    }
}

function Polygon(x, y, color=[255,0,0], vertices=[], name='Unnamed'){
    this.x = x;
    this.y = y;
    this.color = color;
    this.vertices = vertices;
    this.name = name;
}

Polygon.prototype.resetFlags = function(){
    for(vertex_index in this.vertices){
        var vertex = this.vertices[vertex_index];
        vertex.active = false;
    }
}

Polygon.prototype.checkMouse = function( x, y ){
    for(vertex_index in this.vertices){
        var vertex = this.vertices[vertex_index];
        if( vertex.touches(x,y,4,this.x, this.y) ){
            vertex.active = true;
            return vertex;
        }
    }
    return null;
}

Polygon.prototype.draw = function(){
    var last_vertex = this.vertices[this.vertices.length-1];
    var r = this.color[0],
        g = this.color[1],
        b = this.color[2];
    if( Screen.selection.polygon == this ){
        r = 128;
        g = 128;
        b = 128;
    }
    for(vertex_index in this.vertices){
        var vertex = this.vertices[ vertex_index ];
        Screen.line(
            this.x + last_vertex.x, 
            this.y + last_vertex.y, 
            this.x + vertex.x, 
            this.y + vertex.y, 
            r,g,b,
        );
        // get absolute distance
        var distance = Math.sqrt(((vertex.x-last_vertex.x)*(vertex.x-last_vertex.x))+((vertex.y-last_vertex.y)*(vertex.y-last_vertex.y)));
        // draw normal vectors
        if(Math.abs(distance)<1)continue;
        var normal = {
            x : (((this.x+vertex.x) - (this.x+last_vertex.x)) / distance) / 2,
            y : (((this.y+vertex.y) - (this.y+last_vertex.y)) / distance) / 2,
        };
        var vector = {
            x : normal.x * 16,
            y : normal.y * 16,
        };
        var offset = {
            x : this.x+((vertex.x+last_vertex.x)/2),
            y : this.y+((vertex.y+last_vertex.y)/2),
        };
        Screen.line(
            -normal.y, normal.x,
            vector.y ,-vector.x, 
            168,128,128,
            offset.x, 
            offset.y,
        );
        
        // Draw tip of vector direction
        //screen.putPixel(offset.x+-vector.y, offset.y+vector.x, 0,255,0);
        Screen.putPixel(offset.x+vector.y , offset.y+-vector.x, 255,255,255);
        
        
        last_vertex = vertex;        
    }
    // Draw vertices
    for(vertex_index in this.vertices){
        var vertex = this.vertices[ vertex_index ];
        vertex.draw(this.x, this.y, 255,255,255);
    }
    // Draw center
    Screen.putPixel(this.x, this.y, 255,200,0);
}

Polygon.prototype.moveCenter = function(x,y){
    var delta = {
        x : x - this.x,
        y : y - this.y,
    };
    this.x += delta.x;
    this.y += delta.y;
    for(vertex_index in this.vertices){
        var vertex = this.vertices[vertex_index];
        vertex.x -= delta.x;
        vertex.y -= delta.y;        
    }    
}

Polygon.prototype.move = function(x,y){
    var delta = {
        x : x - this.x,
        y : y - this.y,
    };
    this.x += delta.x;
    this.y += delta.y;
    /*
    for(vertex_index in this.vertices){
        var vertex = this.vertices[vertex_index];
        vertex.x += delta.x;
        vertex.y += delta.y;        
    }
    */   
}