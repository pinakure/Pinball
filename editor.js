

var Editor = {

    initialized         : false,

    current_tool        : TOOL.POLYGON,

    polygon             : null,
    current_polygon     : 0,//rename to polygon_index
    snap_to_grid        : false,
    vertices            : [],
    grabbing_vertex     : null,

    polygon_position    : {
        x : 0,
        y : 0,
    },
    mouse_position      : {
        x : 0,
        y : 0,
    },
    selection           : {
        polygon : null,
        vertex  : null,
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
        Table.draw();
        Editor.update();
        return false;
    },

    handleUp : function(event){
        
        const position = getMousePos(event);
        
        event.stopPropagation();  
        switch(event.buttons){
            case BUTTON.LEFT: 
                break;

            case BUTTON.RIGHT:
                if(Editor.grabbing_vertex){

                }
                Editor.grabbing_vertex = false;
                break;
        }
        Editor.update();
    },
    
    handleDown : function(event){
        
        var position = getMousePos(event);
        
        event.stopPropagation();  
        switch(event.buttons){
            case BUTTON.LEFT: 
                if(Editor.current_tool==TOOL.POLYGON){
                    if( Editor.selection.vertex ){
                        if(Editor.vertices.length==0)break;
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
                }
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
                break;

            case BUTTON.MIDDLE:                 
                if( Editor.vertices.length == 0 ){
                    if( shift_on ) Editor.selection.polygon.move(position.x, position.y);
                    else Editor.selection.polygon.moveCenter(position.x, position.y);
                    break;
                }
                if( shift_on ) Table.geometry[ Editor.current_polygon ].move( position.x, position.y );
                else Table.geometry[ Editor.current_polygon ].moveCenter( position.x, position.y );
                Editor.polygon_position.x = position.x;
                Editor.polygon_position.y = position.y;
                event.stopPropagation();
                event.preventDefault();
                break;

            case BUTTON.RIGHT:
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
                break;
        };          
        //Table.draw();
        //Editor.draw();
        //Screen.update();        
        return false;
    },

    draw : function(){
        if( Editor.vertices.length > 0 ){       
            var last = Editor.vertices[ Editor.vertices.length-1 ];
            sx = Editor.polygon_position.x + last.x;
            sy = Editor.polygon_position.y + last.y;
            dx = Editor.mouse_position.x;
            dy = Editor.mouse_position.y;
            Screen.line(sx,sy,dx,dy,128,0,128);
        }
    },

    update : function(){
        // Return false to force Screen.update when returning back to Game.update()
        
        Editor.draw();
        // Screen.update();   
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