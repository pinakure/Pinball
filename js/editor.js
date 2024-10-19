

var Editor = {

    initialized         : false,

    current_tool        : TOOL.POLYGON,

    snap_to_grid        : false,

    draw_normals        : false,
    vertical_axis       : false,
    horizontal_axis     : false,

    grid_size           : 4,

    polygon_info        : null,

    last_selection      : {
        polygon : null,
        vertex  : null,
    },
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
        this.polygon_info = document.getElementById('polygon-info');
        Editor.selection.polygon = null;
        Editor.selection.vertex = null;
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
        if(Editor.selection.polygon == null){
            this.polygon_info.innerHTML = '';
            Editor.last_selection.polygon = null;
            Editor.last_selection.vertex = null;
        } else {
            if(
                (Editor.selection.polygon != Editor.last_selection.polygon)
                ||
                (Editor.selection.vertex != Editor.last_selection.vertex)
            ){
                this.polygon_info.innerHTML = `<div style="font-family: 'ProggySmallTT'; text-align: left !important; margin: 0px 0px 0px 0px; padding 0px 0px 0px 0px;">
                Polygon Name: <input type="text" id="polygon-name" name="polygon-name" spellcheck="false" onchange="Editor.selection.polygon.name=this.value;return 0;" value="${ this.selection.polygon.name }">
                <hr style="border-color: #00f"/>
                Polygon Center:<br/>
                x : ${ this.selection.polygon.x }<br/>
                y : ${ this.selection.polygon.y }<br/>
                <hr style="border-color: #00f"/>
                Vertex:<br/>
                x : ${ this.selection.polygon.x }<br/>
                y : ${ this.selection.polygon.y }<br/>
                </div>`;
                Editor.last_selection.polygon = Editor.selection.polygon;
                Editor.last_selection.vertex = Editor.selection.vertex;
            }
        }
    },

    update : function(){
        // Return false to force Screen.update when returning back to Game.update()
        Editor.draw();
        return true;
    },
    
    setZoom : function(level){
        document.getElementById('canvas').className=`zoom-${level}`;
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

    var info = Infobar.toggles[name];

    eval(`${info.variable} = ${status};`);
    Display.text.blink(`${ info.title } ${ status ? 'en' : 'dis' }abled`, BLINK_MODE_FAST, 1000, DISPLAY_MODE_SCORE);
}
