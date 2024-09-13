var Table = {

    width : 240,
    height : 320,

    data : null,
    colission_mesh : [],
    initialized : false,

    init : function(){
        var img         = new Image();
        img.src         = 'data:@file/png;base64,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';
        img.setAttribute('crossOrigin', '');
        img.onload = function(){
            console.log("Data loaded");
            var canvas      = document.createElement('canvas');
            var context     = canvas.getContext('2d');
            canvas.setAttribute('crossOrigin', '');
            canvas.width    = img.width;
            canvas.height   = img.height;
            context.drawImage(img, 0, 0 );
            Table.data      =  context.getImageData(0, 0, img.width, img.height); 
            Table.initialized = true;
            var r,g,b,i=0,c=0;
            for(var y=0;y<Table.height;y++){
                for(var x=0;x<Table.width;x++){
                    r = Table.data.data[i+0];
                    g = Table.data.data[i+1];
                    b = Table.data.data[i+2];
                    Table.colission_mesh[c] = ( r==255 && g==0 && b==0 );
                    i+=4;
                    c++;
                }
            }    
        };
    },

    normalizeDelta : function(delta){
        if(delta <  1 && delta >= 0 )return 1;
        if(delta > -1 && delta <= 0 )return -1;
        return delta;
    },

    check : function(x,y,delta_x, delta_y){
        return (this.colission_mesh[(parseInt(y+delta_y)*Table.width)+parseInt(x+delta_x)]);
        var q = {
            x : delta_x / Math.max( delta_x, delta_y ),
            y : delta_y / Math.max( delta_x, delta_y ),
        };
        var limit = {
            x : x+delta_x,
            y : y+delta_y,
        };
        if( delta_x > delta_y ){
            for(;x!=limit.x;x+=q.x,y+=q.y){
                if(this.colission_mesh[(parseInt(y)*Table.width)+parseInt(x)]) return true;
            }
        } else if( delta_y > delta_x ){
            for(;y!=limit.y;x+=q.x,y+=q.y){
                if(this.colission_mesh[(parseInt(y)*Table.width)+parseInt(x)]) return true;
            }
        }
        return false;
    },

    collidesX : function(x,y,delta){
        x = parseInt(x);
        y = parseInt(y);
        //delta = Table.normalizeDelta(delta);
        dx = parseInt(x+delta);
        for(var ix = x; ix<dx; ix++){
            if(this.colission_mesh[(y*Table.width)+ix]) return true;
        }        
        return false;
    },

    collidesY : function(x,y,delta){
        x = parseInt(x);
        y = parseInt(y);
        //delta = Table.normalizeDelta(delta);
        dy = parseInt(y+delta);
        for(var iy = y; iy<dy; iy++){
            if(this.colission_mesh[(iy*Table.width)+x]) return true;
        }        
        return false;
    },


    isSolid : function(x,y){
        x = parseInt(x);
        y = parseInt(y);        
        return this.colission_mesh[(y*Table.width)+x];        
    },

    update : function(){
        this.draw();
    },

    draw : function(){

        if(!this.initialized)return;
        var r,g,b,i=0,c=0;
        for(var y=0;y<Table.height;y++){
            for(var x=0;x<Table.width;x++){
                r = this.data.data[i+0];
                g = this.data.data[i+1];
                b = this.data.data[i+2];
                Screen.putPixel(x,y,r,g,b);
                //Screen.putPixel(x,y,this.colission_mesh[c]*255,0,0);
                i+=4;
                c++;
            }
        }
    },

};