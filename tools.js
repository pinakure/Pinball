const PolygonTool = {
    leftDown : function(position){
        if( Editor.selection.vertex ){
            if(Editor.vertices.length==0)return false;
            position.x =  Editor.selection.vertex.x + Editor.selection.polygon.x;
            position.y =  Editor.selection.vertex.y + Editor.selection.polygon.y;                    
        }
        
        if(Editor.vertices.length==0){
            Editor.polygon_position.x = position.x;
            Editor.polygon_position.y = position.y;
        }

        Editor.vertices.push( 
            new Vertex(
                position.x - Editor.polygon_position.x, 
                position.y - Editor.polygon_position.y,
            ) 
        );

        // Please write this properly, store a temp object and add it to 
        // table geometry only when polygon is finished.
        Editor.polygon = new Polygon(
            Editor.polygon_position.x, 
            Editor.polygon_position.y,
            [255,255,0],
            Editor.vertices,
            'temporary',
        );
        
        Table.geometry[ Editor.current_polygon ] = new Polygon(
            Editor.polygon_position.x, 
            Editor.polygon_position.y,
            [255,0,0],
            Editor.vertices,
            'new poly',
        );
    },
    leftDrag : function(position){

    },
    leftUp : function(position){

    },
    middleDown : function(position){

    },
    middleDrag : function(position){

    },
    middleUp : function(position){

    },
    rightDown : function(position){
        var polygon = new Polygon(
            Editor.polygon_position.x, 
            Editor.polygon_position.y,
            [255,0,0],
            Editor.vertices,
            'new poly',
        );
        polygon.consolidate();
        Table.geometry[ Editor.current_polygon ] = polygon;
        Editor.current_polygon++;
        Editor.vertices = new Array;
    },
    rightDrag : function(position){

    },
    rightUp : function(position){

    },
};

const RotateTool = {
    leftDown : function(position){

    },
    leftDrag : function(position){

    },
    leftUp : function(position){

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


const MoveTool = {
    leftDown : function(position){

    },
    leftDrag : function(position){

    },
    leftUp : function(position){

    },
    middleDown : function(position){
        if( Editor.vertices.length == 0 ){
            if( shift_on ) Editor.selection.polygon.move(position.x, position.y);
            else Editor.selection.polygon.moveCenter(position.x, position.y);
            return false;
        }
        if( shift_on ) Table.geometry[ Editor.current_polygon ].move( position.x, position.y );
        else Table.geometry[ Editor.current_polygon ].moveCenter( position.x, position.y );
        Editor.polygon_position.x = position.x;
        Editor.polygon_position.y = position.y;
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

const EraserTool = {
    leftDown : function(position){

    },
    leftDrag : function(position){

    },
    leftUp : function(position){

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

const SnapTool = {
    leftDown : function(position){

    },
    leftDrag : function(position){

    },
    leftUp : function(position){

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


const FlipTool = {
    leftDown : function(position){

    },
    leftDrag : function(position){

    },
    leftUp : function(position){

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

const ExpandTool = {
    leftDown : function(position){

    },
    leftDrag : function(position){

    },
    leftUp : function(position){

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
        console.clear();
        console.log(`Dragging mouse ${position.x},${position.y}`);
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
    },
    
};

