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


Ball.prototype.update = function(){
    /* Solve deltas */
    return 0;

    const BOUNCE_FACTOR_UP      = 1.0;
    const BOUNCE_FACTOR_DOWN    = 0.55;
    const BOUNCE_FACTOR_LEFT    = 0.95;

    this.delta.y += 0.0981;
    this.delta.x *= 0.99;
     
    if(this.y + this.delta.y >= Screen.height-1 ) this.delta.y *= -0.55;
    if(this.y + this.delta.y <= 0               ) this.delta.y *= -1.0;
    
    if(((this.x + this.delta.x) >= Screen.width-1)
    ||(( this.x + this.delta.x) <=              0)){
        this.delta.x = -this.delta.x * 0.95;
    }
    this.direction = (this.delta.y > 0 ? BALL_DIRECTION_DOWN  : (this.delta.y < 0 ? BALL_DIRECTION_UP   : 0)) 
                   | (this.delta.x > 0 ? BALL_DIRECTION_RIGHT : (this.delta.x < 0 ? BALL_DIRECTION_LEFT : 0));

    /* Solve collisions */
    /*--------------------------------------------------------------------------------------*/
    /* A
        .|. 
        .V. 
        ###

        -delta.y
    */
    /**/ 
    if(0){

    }
    
    /*--------------------------------------------------------------------------------------*/
    /* B
        .|/
        .V.
        ##.
        ..#

        -delta.y
        +delta.x
    */
    else if( Table.check( this.x  , this.y+1, this.delta.x, this.delta.y )
    &&       Table.check( this.x-1, this.y+1, this.delta.x, this.delta.y )
    &&      !Table.check( this.x+1, this.y+1, this.delta.x, this.delta.y )
    &&       Table.check( this.x+1, this.y+2, this.delta.x, this.delta.y )
    &&      (this.delta.y > 0)
    ){ 
        console.log('B');
        this.delta.y *= -1; 
        this.delta.x = Math.abs(this.delta.x); 
    }
    /*--------------------------------------------------------------------------------------*/
    /* C
        \|.
        .V.
        .##
        #..

        -delta.y
        -delta.x
    */
    else if( Table.check( this.x  , this.y+2, this.delta.x, this.delta.y )
    &&      !Table.check( this.x  , this.y+1, this.delta.x, this.delta.y )
    &&       Table.check( this.x-1, this.y+1, this.delta.x, this.delta.y )
    &&       Table.check( this.x+1, this.y+1, this.delta.x, this.delta.y )
    &&      (this.delta.y > 0)
    ){ 
        console.log('C');
        this.delta.y *= -1;
        this.delta.x = -Math.abs(this.delta.x); 
    }
    /*--------------------------------------------------------------------------------------*/
    /* D
        \|/
        .V.
        .#.
        #.#

        -delta.y
        +-delta.x
    */
    else if(!Table.check( this.x-1, this.y+1, this.delta.x, this.delta.y )
        &&   Table.check( this.x-1, this.y+2, this.delta.x, this.delta.y )
        &&   Table.check( this.x  , this.y+1, this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1, this.y+1, this.delta.x, this.delta.y )
        &&   Table.check( this.x+1, this.y+2, this.delta.x, this.delta.y )
        &&  (this.delta.y > 0)
    ){ 
        console.log('D');
        this.delta.y *= -1; 
        this.delta.x = polarize(Math.abs(this.delta.x));
    }
    /*--------------------------------------------------------------------------------------*/
    /* E 
        .|/
        #V.
        .##

        -delta.y
        +delta.x
    */
    else if( Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x  , this.y+1, this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x+1, this.y+1, this.delta.x, this.delta.y )
        &&  (this.delta.y > 0)
    ){ 
        console.log('E');
        this.delta.y *= -1; 
        this.delta.x = Math.abs(this.delta.x);
    }
    /*--------------------------------------------------------------------------------------*/
    /* F
        \|.
        .V#
        ##.

        -delta.y
        -delta.x
    */
    else if(!Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
        &&  !Table.check( this.x  , this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x-1, this.y+1, this.delta.x, this.delta.y )
        &&   Table.check( this.x  , this.y+1, this.delta.x, this.delta.y )
        &&  (this.delta.y > 0)
    ){ 
        console.log('F');
        this.delta.y *= -1; 
        this.delta.x = -Math.abs(this.delta.x)*1.1;
    }
    /*--------------------------------------------------------------------------------------*/
    /* G
        .|.
        #V#
        .#.

        -delta.y
    */
    else if( Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x  , this.y+1, this.delta.x, this.delta.y )
        //&&  !Table.check( this.x  , this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
        &&  (this.delta.y > 0)        
    ){ 
        console.log('G');
        this.delta.y = -Math.abs(this.delta.y)*0.55;
    }
    /*--------------------------------------------------------------------------------------*/
    /* H
        .|.
        #V.
        .#\
        ..#

        delta.x = +abs(delta.y)
        delta.y *= 0.5
    */
    else if( Table.check( this.x-1 , this.y   , this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1 , this.y   , this.delta.x, this.delta.y )
        &&   Table.check( this.x   , this.y+1 , this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1 , this.y+1 , this.delta.x, this.delta.y )
        &&   Table.check( this.x+1 , this.y+2 , this.delta.x, this.delta.y )        
        &&  (this.delta.y > 0)
    ){ 
        console.log('H');
        this.delta.x = Math.abs(this.delta.y);
        this.delta.y *= 0.5;  /* GUESS */
    }
    /*--------------------------------------------------------------------------------------*/
    /* I
        .|.
        .V#
        /#.
        #..

        delta.x = -abs(delta.y)
        delta.y *= 0.5
    */
    else if(!Table.check( this.x-1 , this.y   , this.delta.x, this.delta.y )
        &&   Table.check( this.x+1 , this.y   , this.delta.x, this.delta.y )
        &&   Table.check( this.x   , this.y+1 , this.delta.x, this.delta.y )
        &&  !Table.check( this.x-1 , this.y+1 , this.delta.x, this.delta.y )
        &&   Table.check( this.x-1 , this.y+2 , this.delta.x, this.delta.y )
        &&  (this.delta.y > 0)        
    ){ 
        console.log('I');
        this.delta.x = -Math.abs(this.delta.y);
        this.delta.y *= 0.5;  /* GUESS */
    }
    /*--------------------------------------------------------------------------------------*/
    /* J
        ###
        .^.
        .|.

        +delta.y
    */
    else if( Table.check( this.x-1, this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x+1, this.y-1, this.delta.x, this.delta.y )
         && !Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
         && !Table.check( this.x  , this.y  , this.delta.x, this.delta.y )
         && !Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
         &&  (this.delta.y < 0)
    ){ 
        console.log('J');
        this.delta.y = Math.abs(this.delta.y);
    }
    /*--------------------------------------------------------------------------------------*/
    /* K
        ##.
        .^#
        /|.

        +delta.y
        -delta.x
    */
    else if( Table.check( this.x-1, this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
         && !Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
         &&  Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
         &&  (this.delta.y < 0)
    ){ 
        console.log('K');
        this.delta.y =  Math.abs(this.delta.y);
        this.delta.x = -Math.abs(this.delta.x);
    }
    /*--------------------------------------------------------------------------------------*/
    /* L
        .##
        #^.
        .|\

        +delta.y
        +delta.x
    */
    else if( Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
         &&  Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x+1, this.y-1, this.delta.x, this.delta.y )
         && !Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
         &&  (this.delta.y < 0)
    ){ 
        console.log('L');
        this.delta.y = Math.abs(this.delta.y);
        this.delta.x = Math.abs(this.delta.x);
    }
    /*--------------------------------------------------------------------------------------*/
    /* M
        .#.
        #^#
        .|.

        +delta.y
    */
    else if( Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
         &&  Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
         &&  (this.delta.y < 0)        
    ){ 
        console.log('M');
        this.delta.y = Math.abs(this.delta.y);
    }
    /*--------------------------------------------------------------------------------------*/
    /* N
        #..
        .##
        .^.
        /|.

        +delta.y
        -delta.x
    */
    else if( Table.check( this.x-1, this.y-2, this.delta.x, this.delta.y )
         && !Table.check( this.x-1, this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )         
         &&  Table.check( this.x+1, this.y-1, this.delta.x, this.delta.y )
         &&  (this.delta.y < 0)        
    ){ 
        console.log('N');
        this.delta.y =-Math.abs(this.delta.y)*0.5;
        this.delta.x =-Math.abs(this.delta.y);
    }   
    /*--------------------------------------------------------------------------------------*/
    /* O
        ..#
        ##.
        .^.
        .|\

        +delta.y
        +delta.x
    */
    else if( Table.check( this.x-1, this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
         &&  Table.check( this.x+1, this.y-2, this.delta.x, this.delta.y )
         && !Table.check( this.x+1, this.y-1, this.delta.x, this.delta.y )
         && !Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
         && !Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
         &&  (this.delta.y < 0)
    ){ 
        console.log('O');
        this.delta.y = Math.abs(this.delta.y);
        this.delta.x = Math.abs(this.delta.x);
    }   
    /*--------------------------------------------------------------------------------------*/
    /* P
        #.#
        .#.
        .^.
        /|\

        +delta.y
        +-delta.x
    */
    else if( Table.check( this.x-1, this.y-2, this.delta.x, this.delta.y )
        &&   Table.check( this.x+1, this.y-2, this.delta.x, this.delta.y )
        &&  !Table.check( this.x-1, this.y-1, this.delta.x, this.delta.y )
        &&   Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1, this.y-1, this.delta.x, this.delta.y )
        &&  !Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
        &&  (this.delta.y < 0)
    ){ 
        console.log('P');
        this.delta.y *= Math.abs(this.delta.y); 
        this.delta.x = polarize(Math.abs(this.delta.x));
    }
    /*--------------------------------------------------------------------------------------*/
    /* Q
        #..
        \#.
        .^#
        .|.

        delta.x = -abs(delta.y)
        delta.y *= 0.5
        
    */
    else if( Table.check( this.x-1, this.y-2, this.delta.x, this.delta.y )
        &&  !Table.check( this.x-1, this.y-1, this.delta.x, this.delta.y )
        &&   Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
        &&  !Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
        &&  (this.delta.y < 0)
    ){ 
        console.log('Q');
        this.delta.y *= Math.abs(this.delta.y); 
        this.delta.x = -Math.abs(this.delta.x);
    }
    /*--------------------------------------------------------------------------------------*/
    /* R
        ..#
        .#/
        #^.
        .|.

        delta.x = +abs(delta.y)
        delta.y *= 0.5
        
    */
    else if( Table.check( this.x-1, this.y  , this.delta.x, this.delta.y )
        &&   Table.check( this.x  , this.y-1, this.delta.x, this.delta.y )
        &&   Table.check( this.x+1, this.y-2, this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1, this.y-1, this.delta.x, this.delta.y )
        &&  !Table.check( this.x+1, this.y  , this.delta.x, this.delta.y )
        &&  (this.delta.y < 0)
    ){ 
        console.log('R');
        this.delta.x =  Math.abs(this.delta.y);
        this.delta.y *= 0.5; 
    }
    /*--------------------------------------------------------------------------------------*/
    else if(    Table.check( this.x  , this.y+1, this.delta.x, this.delta.y )
        &&      Table.check( this.x-1, this.y+1, this.delta.x, this.delta.y )
        &&      Table.check( this.x+1, this.y+1, this.delta.x, this.delta.y )
        &&     (this.delta.y > 0)
    ){ 
        console.log('A');
        this.delta.y *= -Math.abs(this.delta.y);
    }
/*--------------------------------------------------------------------------------------*/


    
    if( Table.collidesX( this.x, this.y, this.delta.x )
    ||( Table.isSolid( this.x+this.delta.x, this.y ))
    ){
        if(this.direction & BALL_DIRECTION_LEFT) {
            this.x-=this.delta.x;
            this.delta.x = -this.delta.x;
        } else if(this.direction & BALL_DIRECTION_RIGHT) {
            this.x-=this.delta.x;
            this.delta.x = -this.delta.x;
        }
    }
    // Apply horizontal force
    this.x += this.delta.x;
    
    if( Table.collidesY( this.x, this.y, this.delta.y )
    ||( Table.isSolid( this.x, this.y+this.delta.y ))
    ){
        if(this.direction & BALL_DIRECTION_DOWN) {
            if(Table.isSolid(this.x-1, this.y+this.delta.y)){
                this.delta.x = Math.abs(this.delta.x)*1.5;
                this.x++;
            } else if(Table.isSolid(this.x+1, this.y+this.delta.y)){
                this.delta.x = -Math.abs(this.delta.x)*1.5;
                this.x--;
            } 
            this.y-=this.delta.y;
            this.delta.y *= -0.55;
            //this.delta.x += ((Math.random()*1.0)-0.5)*0.1;
        } else if(this.direction & BALL_DIRECTION_UP) {
            this.y+=Math.abs(this.delta.y);
            this.delta.y *= -1.0;
            //this.delta.x += ((Math.random()*1.0)-0.5)*0.1;
        }
    }

    // Apply vertical force
    this.y += this.delta.y;
    
   /*this.y += this.delta.y;
   this.x += this.delta.x;  */  
    
    /* Correct position */
    if(this.y >= Screen.height-1 ) {
        this.y = Screen.height-1;                
    }
}
