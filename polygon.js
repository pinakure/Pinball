function Vertex(x,y){
    this.x = x;
    this.y = y;
}

function Polygon(x, y, color=[255,0,0], vertices=[], name='Unnamed'){
    this.x = x;
    this.y = y;
    this.color = color;
    this.vertices = vertices;
    this.name = name;
}

Polygon.prototype.draw = function(screen){
    var last_vertex = this.vertices[this.vertices.length-1];
    for(vertex_index in this.vertices){
        var vertex = this.vertices[ vertex_index ];
        screen.line(this.x + last_vertex.x, this.y + last_vertex.y, this.x + vertex.x, this.y + vertex.y, this.color[0], this.color[1], this.color[2]);
        // get absolute distance
        var distance = Math.sqrt(((vertex.x-last_vertex.x)*(vertex.x-last_vertex.x))+((vertex.y-last_vertex.y)*(vertex.y-last_vertex.y)));
        // draw normal vectors
        if(Math.abs(distance)<1)continue;
        var vector = {
            x : (((this.x+vertex.x) - (this.x+last_vertex.x)) / distance) * 8,
            y : (((this.y+vertex.y) - (this.y+last_vertex.y)) / distance) * 8,
        };
        var normal = {
            x : (((this.x+vertex.x) - (this.x+last_vertex.x)) / distance) / 2,
            y : (((this.y+vertex.y) - (this.y+last_vertex.y)) / distance) / 2,
        };
        var offset = {
            x : this.x+((vertex.x+last_vertex.x)/2),
            y : this.y+((vertex.y+last_vertex.y)/2),
        };
        screen.line(
            -normal.y, normal.x,
            vector.y ,-vector.x, 
            168,128,128,
            offset.x, 
            offset.y,
        );
        
        screen.putPixel(offset.x+-vector.y, offset.y+vector.x, 0,255,0);
        screen.putPixel(offset.x+vector.y , offset.y+-vector.x, 255,0,0);
        
        
        last_vertex = vertex;        
    }
    // Draw vertices
    for(vertex_index in this.vertices){
        var vertex = this.vertices[ vertex_index ];
        screen.putPixel(this.x+vertex.x, this.y+vertex.y, 128,255,0);
    }
    // Draw center
    screen.putPixel(this.x, this.y, 255,200,0);
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