function Ball(x,y){
    this.x = x;
    this.y = y;
    this.direction = BALL_DIRECTION_NONE;
    this.delta = {
        x : 0,
        y : 0,
    };
}

function polarize(x){
    if(parseInt(Math.random()*2)>0)return x;
    return -x;
}


function Segment(sx=0,sy=0,dx=0,dy=0){
    this.sx = sx;
    this.sy = sy;
    this.dx = dx;    
    this.dy = dy;    
}

Segment.prototype.isInside = function(bounding_box={sx:0,sy:0,dx:1,dy:1}){
    var points = Screen.getLine(
        bounding_box.sx,
        bounding_box.sy,
        bounding_box.dx,
        bounding_box.dy,
    );
    for(point_index in points){
        var point = points[ point_index ];
        if( ( point[0] >= this.sx )
          &&( point[1] >= this.sy )
          &&( point[0] <= this.dx )
          &&( point[1] <= this.dx )
        ){
            return true;
        }
    }
    return false;
}

Segment.prototype.intersects = function(edge={sx:0,sy:0,dx:1,dy:1}){
    var x1 = this.sx, y1 = this.sy, x2 = this.dx, y2 = this.dy;
    var x3 = edge.sx, y3 = edge.sy, x4 = edge.dx, y4 = edge.dy;
    return (
        (((x4-x3)*(y1-y3))-((x1-x3)*(y4-y3)))
        *
        (((x4-x3)*(y2-y3))-((x2-x3)*(y4-y3))) 
    ) <= 0;
}

Ball.prototype.updateDeltas = function(){
    /* Solve deltas */
    this.delta.y += 0.0981;
    this.delta.x *= 0.99;

    /* Check colissions with geometry */
    var segment = new Segment(
        parseInt(this.x), 
        parseInt(this.y), 
        parseInt(this.x + this.delta.x), 
        parseInt(this.y + this.delta.y), 
    );
    for( polygon_index in Table.geometry){
        var polygon = Table.geometry[polygon_index];
        polygon.bounding_box.active = false;
    }
    for( polygon_index in Table.geometry){
        var polygon = Table.geometry[polygon_index];
        if( segment.isInside(polygon.bounding_box) ){// detect if segment colissides somewhere in this polygon
            var last_vertex = polygon.vertices[polygon.vertices.length-1];
            polygon.bounding_box.active = true;
            for(vertex_index in polygon.vertices){ 
                var vertex = polygon.vertices[vertex_index];
                var edge = {
                    sx : polygon.x + last_vertex.x,
                    sy : polygon.y + last_vertex.y,
                    dx : polygon.x + vertex.x,
                    dy : polygon.y + vertex.y,
                };
                if(segment.intersects(edge)){
                    // if this polygon edge intersects delta vector (segment), 
                    // bounce this.delta towards edge normal direction
                    this.delta.x += polygon.normals[vertex_index].x*2;
                    this.delta.y += polygon.normals[vertex_index].y*2;
                    return 0;
                }// else try next polygon edge
                last_vertex = vertex;
            }
            
        }// else try next polygon
    }   
}

Ball.prototype.update = function(){
    
    this.updateDeltas();

    const BOUNCE_FACTOR_UP      = 1.0;
    const BOUNCE_FACTOR_DOWN    = 0.55;
    const BOUNCE_FACTOR_LEFT    = 0.95;

    if(this.y + this.delta.y >= Screen.height-1 ) this.delta.y *= -0.55;
    if(this.y + this.delta.y <= 0               ) this.delta.y *= -1.0;
    
    if(((this.x + this.delta.x) >= Screen.width-1)
    ||(( this.x + this.delta.x) <=              0)){
        this.delta.x = -this.delta.x * 0.95;
    }
    this.direction = (this.delta.y > 0 ? BALL_DIRECTION_DOWN  : (this.delta.y < 0 ? BALL_DIRECTION_UP   : 0)) 
                   | (this.delta.x > 0 ? BALL_DIRECTION_RIGHT : (this.delta.x < 0 ? BALL_DIRECTION_LEFT : 0));

    // Apply horizontal force
    this.x += this.delta.x;
    
    // Apply vertical force
    this.y += this.delta.y;
    
    /* Correct position */
    if(this.y >= Screen.height-1 ) {
        this.y = Screen.height-1;                
    }
  
}
