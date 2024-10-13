const PolygonTool = {

    polygon     : null,
    vertices    : [],
    position    : {
        x : 0,
        y : 0,
    },

    leftDown : function(position){
        // Force to use selected vertex coordinates if any vertex is selected, instead of mouse coordinates
        if( Editor.selection.vertex ){
            position.x =  Editor.selection.vertex.x + Editor.selection.polygon.x;
            position.y =  Editor.selection.vertex.y + Editor.selection.polygon.y;                    
        }
        
        if( this.vertices.length==0 ){
            this.position.x = position.x;
            this.position.y = position.y;
        }

        this.vertices.push( 
            new Vertex(
                position.x - this.position.x, 
                position.y - this.position.y,
            ) 
        );
        // (Re)generate temporary polygon
        this.polygon = new Polygon(
            this.position.x, 
            this.position.y,
            [255,255,0],
            this.vertices,
            'temporary',
        );
    },
    leftDrag : function(position){},
    leftUp : function(position){},
    middleDown : function(position){},
    middleDrag : function(position){},
    middleUp : function(position){},
    rightDown : function(position){
        // Copy temporary polygon to table geometry
        Table.geometry.push(
            new Polygon(
                this.position.x, 
                this.position.y,
                [255,0,0],
                this.vertices,
                'new poly',
            ).consolidate()
        );
        this.vertices = new Array;
    },
    rightDrag : function(position){},
    rightUp : function(position){},
};

const RotateTool = {
    
    drag : null,
    last_position : null,
    angle : 0,

    leftDown : function(position){
        if( !Editor.selection.polygon ) return;
        this.drag = Editor.selection.polygon;
        this.last_position = position;
        this.angle = 0;
    },
    leftDrag : function(position){
        if( !this.drag ) return;
        var delta = (position.x+position.y)-(this.last_position.x+this.last_position.y);
        
        if(delta>0) this.angle = 1;
        else if(delta<0) this.angle = -1;
        else this.angle = 0;
        
        delta = this.angle * Math.PI / 180;

        var origin = {
            x : this.drag.x ,
            y : this.drag.y ,
        };
        this.drag.x = 0;
        this.drag.y = 0;
        for( vertex_index in this.drag.vertices ){
            vertex = this.drag.vertices[ vertex_index ];
            vertex.x = this.drag.x + (Math.cos(delta) * (vertex.x-this.drag.x)) + Math.sin(delta) * (vertex.y-this.drag.y);
            vertex.y = this.drag.y + (-Math.sin(delta) * (vertex.x-this.drag.x)) + Math.cos(delta) * (vertex.y-this.drag.y);
        }
        this.drag.x = origin.x;
        this.drag.y = origin.y;
        this.drag.consolidate();
        this.last_position = position;
    },
    leftUp : function(position){
        if( !this.drag ) return;
        this.drag.consolidate();
        this.drag = null;
    },
    middleDown : function(position){},
    middleDrag : function(position){},
    middleUp : function(position){},
    rightDown : function(position){},
    rightDrag : function(position){},
    rightUp : function(position){},
};

const MoveTool = {

    drag : null,

    leftDown : function(position){
        if( !Editor.selection.vertex ) return;
        this.drag = Editor.selection.vertex;
    },
    leftDrag : function(position){
        if( !this.drag ) return;
        this.drag.x = position.x - Editor.selection.polygon.x;
        this.drag.y = position.y - Editor.selection.polygon.y;
        Editor.selection.polygon.consolidate();
    },
    leftUp : function(position){
        if( !this.drag ) return;
        Editor.selection.polygon.consolidate();
        this.drag = null;
    },
    middleDown : function(position){
        if( Editor.selection.polygon ){
            if( shift_on ) Editor.selection.polygon.move(position.x, position.y);
            else Editor.selection.polygon.moveCenter(position.x, position.y);
            return false;
        }
    },
    middleDrag : function(position){},
    middleUp : function(position){},
    rightDown : function(position){},
    rightDrag : function(position){},
    rightUp : function(position){},
};
const EraserTool = {
    leftDown : function(position){
        if( Editor.selection.polygon ){
            if( shift_on ) {
                // Delete whole polygon
                Table.geometry.splice( 
                    Table.geometry.indexOf( 
                        Editor.selection.polygon
                    ), 
                    1
                );
                Editor.selection.polygon = null;
                Editor.selection.vertex = null;
            } else {
                if( Editor.selection.vertex ){
                    // Delete just a vertex
                    Editor.selection.polygon.vertices.splice(
                        Editor.selection.polygon.vertices.indexOf( 
                            Editor.selection.vertex 
                        ),
                        1
                    );
                    Editor.selection.vertex = null;
                    // If, after deleting a vertex the polygon has no vertices left, delete the polygon too
                    if(Editor.selection.polygon.vertices.length == 0){
                        Table.geometry.splice( 
                            Table.geometry.indexOf( 
                                Editor.selection.polygon
                            ), 
                            1
                        );
                        Editor.selection.polygon = null;
                    }
                }
            }
            return false;
        }        
    },
    leftDrag : function(position){},
    leftUp : function(position){},
    middleDown : function(position){},
    middleDrag : function(position){},
    middleUp : function(position){},
    rightDown : function(position){},
    rightDrag : function(position){},
    rightUp : function(position){},
};
const SnapTool = {
    leftDown : function(position){
        if( shift_on ){
            // Snap all polygon vertices
            if( Editor.selection.polygon ){
                for( vertex_index in Editor.selection.polygon.vertices ){
                    var vertex = Editor.selection.polygon.vertices[ vertex_index ];
                    vertex.x = parseInt(vertex.x / Editor.grid_size);
                    vertex.y = parseInt(vertex.y / Editor.grid_size);
                    vertex.x *= Editor.grid_size;
                    vertex.y *= Editor.grid_size;
                    Editor.selection.polygon.consolidate();                    
                }
            }
        } else {
            // Snap only this vertex
            if( Editor.selection.vertex ){
                Editor.selection.vertex.x = parseInt(Editor.selection.vertex.x / Editor.grid_size);
                Editor.selection.vertex.y = parseInt(Editor.selection.vertex.y / Editor.grid_size);
                Editor.selection.vertex.x *= Editor.grid_size;
                Editor.selection.vertex.y *= Editor.grid_size;
                Editor.selection.polygon.consolidate();
            }
        }
    },
    leftDrag : function(position){},
    leftUp : function(position){},
    middleDown : function(position){},
    middleDrag : function(position){},
    middleUp : function(position){},
    rightDown : function(position){},
    rightDrag : function(position){},
    rightUp : function(position){},
};
const FlipTool = {
    leftDown : function(position){
        if( Editor.selection.polygon ){
            if( shift_on ){
                // Flip polygon vertically
                for( vertex_index in Editor.selection.polygon.vertices ){
                    var vertex = Editor.selection.polygon.vertices[ vertex_index ];
                    vertex.y = -vertex.y;
                }
                Editor.selection.polygon.consolidate();
            } else {
                // Flip polygon horizontally
                for( vertex_index in Editor.selection.polygon.vertices ){
                    var vertex = Editor.selection.polygon.vertices[ vertex_index ];
                    vertex.x = -vertex.x;
                }
                Editor.selection.polygon.consolidate();            
            }
        }
    },
    leftDrag : function(position){},
    leftUp : function(position){},
    middleDown : function(position){},
    middleDrag : function(position){},
    middleUp : function(position){},
    rightDown : function(position){
        if( Editor.selection.polygon ){
            // Flip polygon normals
            Editor.selection.polygon.vertices.reverse();
        }
    },
    rightDrag : function(position){},
    rightUp : function(position){},
};

const ExpandTool = {
    
    drag : null,
    last_position : null,

    leftDown : function(position){
        if( !Editor.selection.polygon ) return;
        this.drag = Editor.selection.polygon;
        this.last_position = position;
    },
    leftDrag : function(position){
        if( !this.drag ) return;
        var delta = (position.x+position.y)-(this.last_position.x+this.last_position.y);
        
        if(delta>0) delta = shift_on ? 1.1 : 1.01;
        else if(delta<0) delta = shift_on ? 0.9 : 0.99;
        else delta = 1;

        var origin = {
            x : this.drag.x,
            y : this.drag.y,
        };

        this.drag.x = 0;
        this.drag.y = 0;
        
        for( vertex_index in this.drag.vertices ){
            var vertex = this.drag.vertices[ vertex_index ];
            var distance = {
                x : vertex.x,
                y : vertex.y,
            };
            
            vertex.x *= delta;
            vertex.y *= delta;
        }
        this.drag.x = origin.x;
        this.drag.y = origin.y;
        
        this.drag.consolidate();
        this.last_position = position;
    },
    leftUp : function(position){
        if( !this.drag ) return;
        this.drag.consolidate();
        this.drag = null;
        this.last_position = null;
    },
    middleDown : function(position){

    },
    middleDrag : function(position){

    },
    middleUp : function(position){

    },
    rightDown : function(position){

    },
    rightDrag : function(position){

    },
    rightUp : function(position){

    },
};

var Tools = {
    leftMouseDown : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.leftDown(position); break;
            case TOOL.ROTATE    : RotateTool.leftDown(position); break;                
            case TOOL.MOVE      : MoveTool.leftDown(position); break;
            case TOOL.ERASER    : EraserTool.leftDown(position); break;
            case TOOL.SNAP      : SnapTool.leftDown(position); break;
            case TOOL.FLIP      : FlipTool.leftDown(position); break;
            case TOOL.EXPAND    : ExpandTool.leftDown(position); break;
        }
        navigator.clipboard.writeText( Table.serialize() );
        return false;
    },
    leftMouseDrag : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.leftDrag(position); break;
            case TOOL.ROTATE    : RotateTool.leftDrag(position); break;                
            case TOOL.MOVE      : MoveTool.leftDrag(position); break;
            case TOOL.ERASER    : EraserTool.leftDrag(position); break;
            case TOOL.SNAP      : SnapTool.leftDrag(position); break;
            case TOOL.FLIP      : FlipTool.leftDrag(position); break;
            case TOOL.EXPAND    : ExpandTool.leftDrag(position); break;
        }
        Table.draw();
        Editor.update();
        navigator.clipboard.writeText( Table.serialize() );
        return false;        
    },
    leftMouseUp : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.leftUp(position); break;
            case TOOL.ROTATE    : RotateTool.leftUp(position); break;                
            case TOOL.MOVE      : MoveTool.leftUp(position); break;
            case TOOL.ERASER    : EraserTool.leftUp(position); break;
            case TOOL.SNAP      : SnapTool.leftUp(position); break;
            case TOOL.FLIP      : FlipTool.leftUp(position); break;
            case TOOL.EXPAND    : ExpandTool.leftUp(position); break;
        }
        Editor.update();
        navigator.clipboard.writeText( Table.serialize() );
        return false;
    },

    middleMouseDown : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.middleDown(position); break;
            case TOOL.ROTATE    : RotateTool.middleDown(position); break;                
            case TOOL.MOVE      : MoveTool.middleDown(position); break;
            case TOOL.ERASER    : EraserTool.middleDown(position); break;
            case TOOL.SNAP      : SnapTool.middleDown(position); break;
            case TOOL.FLIP      : FlipTool.middleDown(position); break;
            case TOOL.EXPAND    : ExpandTool.middleDown(position); break;
        }
        navigator.clipboard.writeText( Table.serialize() );
        return false;
    },
    middleMouseDrag : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.middleDrag(position); break;
            case TOOL.ROTATE    : RotateTool.middleDrag(position); break;                
            case TOOL.MOVE      : MoveTool.middleDrag(position); break;
            case TOOL.ERASER    : EraserTool.middleDrag(position); break;
            case TOOL.SNAP      : SnapTool.middleDrag(position); break;
            case TOOL.FLIP      : FlipTool.middleDrag(position); break;
            case TOOL.EXPAND    : ExpandTool.middleDrag(position); break;
        }
        Table.draw();
        Editor.update();
        navigator.clipboard.writeText( Table.serialize() );
        return false;        
    },
    middleMouseUp : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.middleUp(position); break;
            case TOOL.ROTATE    : RotateTool.middleUp(position); break;                
            case TOOL.MOVE      : MoveTool.middleUp(position); break;
            case TOOL.ERASER    : EraserTool.middleUp(position); break;
            case TOOL.SNAP      : SnapTool.middleUp(position); break;
            case TOOL.FLIP      : FlipTool.middleUp(position); break;
            case TOOL.EXPAND    : ExpandTool.middleUp(position); break;
        }
        Editor.update();
        navigator.clipboard.writeText( Table.serialize() );
    },
    
    rightMouseDown : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.rightDown(position); break;
            case TOOL.ROTATE    : RotateTool.rightDown(position); break;                
            case TOOL.MOVE      : MoveTool.rightDown(position); break;
            case TOOL.ERASER    : EraserTool.rightDown(position); break;
            case TOOL.SNAP      : SnapTool.rightDown(position); break;
            case TOOL.FLIP      : FlipTool.rightDown(position); break;
            case TOOL.EXPAND    : ExpandTool.rightDown(position); break;
        }
        navigator.clipboard.writeText( Table.serialize() );
    },
    rightMouseDrag : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.rightDrag(position); break;
            case TOOL.ROTATE    : RotateTool.rightDrag(position); break;                
            case TOOL.MOVE      : MoveTool.rightDrag(position); break;
            case TOOL.ERASER    : EraserTool.rightDrag(position); break;
            case TOOL.SNAP      : SnapTool.rightDrag(position); break;
            case TOOL.FLIP      : FlipTool.rightDrag(position); break;
            case TOOL.EXPAND    : ExpandTool.rightDrag(position); break;
        }
        Table.draw();
        Editor.update();
        navigator.clipboard.writeText( Table.serialize() );
        return false;        
    },    
    rightMouseUp : function(position){
        switch(Editor.current_tool){
            case TOOL.POLYGON   : PolygonTool.rightUp(position); break;
            case TOOL.ROTATE    : RotateTool.rightUp(position); break;                
            case TOOL.MOVE      : MoveTool.rightUp(position); break;
            case TOOL.ERASER    : EraserTool.rightUp(position); break;
            case TOOL.SNAP      : SnapTool.rightUp(position); break;
            case TOOL.FLIP      : FlipTool.rightUp(position); break;
            case TOOL.EXPAND    : ExpandTool.rightUp(position); break;
        }        
        Editor.update();
        navigator.clipboard.writeText( Table.serialize() );
    },
    
};