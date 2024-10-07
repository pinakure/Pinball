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
        last_vertex = vertex;        
    }
    screen.putPixel(this.x, this.y, 255,255,0);
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