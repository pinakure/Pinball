

var Editor = {

    initialized         : false,

    current_tool        : TOOL.POLYGON,

    snap_to_grid        : false,

    /*
    vertices            : [],
    grabbing_vertex     : null,

    polygon_position    : {
        x : 0,
        y : 0,
    },
    */
    selection           : {
        polygon : null,
        vertex  : null,
    },

    mouse_position      : {
        x : 0,
        y : 0,
    },
    
    init : function(){
        document.getElementById('canvas').addEventListener('mouseup'  , Editor.handleUp);
        document.getElementById('canvas').addEventListener('mousedown', Editor.handleDown);
        document.getElementById('canvas').addEventListener('mousemove', Editor.handleHover);
        Table.render_backdrop = false;
        Infobar.init();
        Infobar.selectTool('polygon');
        this.initialized = true;
    },

    resetSelection : function(){
        this.selection.polygon = null;
        this.selection.vertex = null;        
    },

    handleHover : function(event){
        const position = getMousePos(event);
        Editor.mouse_position = position;
        
        event.stopPropagation();  
        event.preventDefault();
        
        switch(event.buttons){
            case BUTTON.LEFT    : return Tools.leftMouseDrag(position);
            case BUTTON.MIDDLE  : return Tools.middleMouseDrag(position);
            case BUTTON.RIGHT   : return Tools.rightMouseDrag(position);
        }
        Editor.update();
    },

    handleUp : function(event){
        const position = getMousePos(event);
        Editor.mouse_position = position;
        
        event.stopPropagation();  
        event.preventDefault();
        switch(event.which){
            case 1  : return Tools.leftMouseUp(position);
            case 2  : return Tools.middleMouseUp(position);
            case 3  : return Tools.rightMouseUp(position);
        }
    },
    
    handleDown : function(event){
        const position = getMousePos(event);
        Editor.mouse_position = position;
        
        event.stopPropagation();
        event.preventDefault();

        switch(event.buttons){
            case BUTTON.LEFT    : return Tools.leftMouseDown(position);
            case BUTTON.MIDDLE  : return Tools.middleMouseDown(position);
            case BUTTON.RIGHT   : return Tools.rightMouseDown(position);
        };
    },

    draw : function(){
        if( Editor.current_tool == TOOL.POLYGON && PolygonTool.vertices.length > 0){
        
            PolygonTool.polygon.draw();

            var last = PolygonTool.vertices[ PolygonTool.vertices.length-1 ];
            sx = PolygonTool.position.x + last.x;
            sy = PolygonTool.position.y + last.y;
            dx = Editor.mouse_position.x;
            dy = Editor.mouse_position.y;
            Screen.line(sx,sy,dx,dy,128,0,128);
        }
    },

    update : function(){
        // Return false to force Screen.update when returning back to Game.update()
        Editor.draw();
        return true;
    },

};


function toggle(name){
    var status = false;
    var node = document.getElementById(name);
    if( node.className.includes('selected')){
        node.className = 'toolbar-button toggle';
        status = false;
    }else {
        node.className = 'toolbar-button toggle selected';
        status = true;
    }

    switch(name){
        case 'grid':
            Editor.snap_to_grid = status;
            text = 'Snap to grid';
            break;
        case 'backdrop':
            Table.render_backdrop = status;
            text = 'Show bg image';
            break;
    }
    Display.text.blink(`${text} ${status ? 'en' : 'dis' }abled`, BLINK_MODE_FAST, 1000, DISPLAY_MODE_SCORE);
            
}
