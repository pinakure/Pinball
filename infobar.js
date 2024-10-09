// PRMEXSFGI
var Infobar = {
    tools : {
        polygon : {
            icon    : 'draw-polygon',
            title   : 'Polygon Tool',        
            hotkey  : 'P',
            keycode : KEY_P,
            tool    : TOOL.POLYGON,            
            actions : {
                LB : 'Create Vertex',
                MB : 'Move Center',
                RB : 'Finish Polygon',
                shift : {
                },
                alt : {
                },
                ctrl : {
                },
            },
        },
        rotate    : {
            icon    : 'undo',
            title   : 'Rotate Tool',
            hotkey  : 'R',
            keycode : KEY_R,
            tool    : TOOL.ROTATE,
            actions : {
                LB : 'Select polygon',
                WHEEL : 'Inc/Decrease',
                shift : {
                    WHEEL : 'Quantized Rotation',
                },
                alt : {                
                },
                ctrl : {
                },
            },
        },
        move  : {
            icon    : 'arrows-alt',
            title   : 'Move Tool',
            hotkey  : 'M',
            keycode : KEY_M,
            tool    : TOOL.MOVE,
            actions : {
                LB : 'Move Vertex',
                MB : 'Move Center',
                shift : {
                    MB : 'Move Polygon',
                },
                alt : {                
                },
                ctrl : {
                },
            },
        },
        eraser    : {
            icon    : 'eraser',
            title   : 'Erase tool',
            hotkey  : 'E',
            keycode : KEY_E,
            tool    : TOOL.ERASER,
            actions : {
                LB : 'Erase Vertex',
                shift : {
                    LB : 'Erase Polygon',
                },
                alt : {                
                },
                ctrl : {
                },
            },
        },
        expand : {
            icon    : 'expand',
            title   : 'Expand / Shrink',
            hotkey  : 'X',
            keycode : KEY_X,
            tool    : TOOL.EXPAND,
            actions : {
                WHEEL : 'Resize Polygon',
                shift : {
                    WHEEL : 'Quantized Resizing',
                },
                alt : {                
                },
                ctrl : {
                },
            },
        },
        snap   : {
            icon    : 'vector-square',
            title   : 'Snap tool',
            hotkey  : 'S',
            keycode : KEY_S,
            tool    : TOOL.SNAP,
            actions : {
                LB : 'Snap Vertex',
                shift : {
                    LB : 'Snap Polygon',
                },
                alt : {                
                },
                ctrl : {
                },
            },
        },
        flip  : {
            icon    : 'arrows-alt-h',
            title   : 'Flip tool',
            hotkey  : 'F',
            keycode : KEY_F,
            tool    : TOOL.FLIP,
            actions : {
                LB : 'HFlip Edge',
                RB : 'VFlip Edge',
                shift : {
                    LB : 'HFlip Polygon',
                    RB : 'VFlip Polygon',
                },
                alt : {                
                },
                ctrl : {
                },
            },
        },
    },

    toggles : {
        grid : {
            icon    : 'th',
            hotkey  : 'G',
            keycode : KEY_G,
            title   : 'Grid',
        },
        backdrop : {
            icon    : 'image',
            hotkey  : 'I',
            keycode : KEY_I,
            title   : 'Show Backdrop Image',
        },
    },

    init : function(){
        var node = document.getElementById('toolbar');
        for(key in Infobar.tools){
            var info = Infobar.tools[key];            
            node.innerHTML += `<button onclick="Infobar.selectTool('${key}')" class="toolbar-button tool" id="${key}" title="${info.title} (${info.hotkey})"><i class="fa fa-${info.icon}"></i></button>`;
        }
        node.innerHTML += '<hr style="border-color: #a0a0a0;"/>';
    
        for(key in Infobar.toggles){
            var info = Infobar.toggles[key];            
            node.innerHTML += `<button onclick="toggle('${key}')" class="toolbar-button toggle" id="${key}" title="${info.title} (${info.hotkey})"><i class="fa fa-${info.icon}"></i></button>`;
        }        
    },
    
    buildTable : function(info, key_prefix=''){
        var payload = '';
        key_prefix = key_prefix==''?key_prefix:`${ key_prefix } + `;
        for(key in info){
            if(key == 'shift')continue;
            if(key == 'alt'  )continue;
            if(key == 'ctrl' )continue;
            payload += `<tr><td>${key_prefix}${ key }</td><td>${info[key]}</td></tr>`;
        }
        if(key_prefix) return payload;
        payload += Infobar.buildTable(info.shift, 'Shift');
        payload += Infobar.buildTable(info.ctrl , 'Ctrl' );
        payload += Infobar.buildTable(info.alt  , 'Alt'  );
        return payload;
    },

    selectTool : function(name){
        var info = Infobar.tools[name];
        var node = document.getElementById('infobar');
        node.innerHTML = `
            <div id="info-${name}">
                <h2 style="font-weight: 400;"><i class="fa fa-${info.icon}"></i>&nbsp;${info.title}</h2>
                <hr style="border-color: #0f0;"/>
                <table>${Infobar.buildTable(info.actions)}</table>
            </div>
        `; 
        var nodes = document.getElementsByClassName('tool');
        for(i in nodes){
            nodes[i].className = 'toolbar-button tool';
        }
        var node = document.getElementById(name);
        node.className = 'toolbar-button tool selected';

        switch(info.tool){
            case TOOL.POLYGON:
                console.log(info.title,'selected');
                break;
            case TOOL.ROTATE:
                break;
            case TOOL.MOVE:
                break;
            case TOOL.ERASER:
                break;
            case TOOL.EXPAND:
                break;
            case TOOL.SNAP: 
                break;
            case TOOL.FLIP: 
                break;
        }
        Display.text.blink(`${info.title}`, BLINK_MODE_FAST, 1000, DISPLAY_MODE_SCORE);
        Editor.current_tool = info.tool;
    },
};

