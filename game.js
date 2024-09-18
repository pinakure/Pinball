const DEFAULT_BALL_COUNT = 1;//3

var Game = {
    ball_count  : 0,
    score       : 0,
    game_over   : true,
    step_by_step: true,
    
    
    balls        : null,
    
    
    init : function(){
        Screen.init();
        Display.init();
        Table.init();
        Game.new();
        Game.update();
    },
    
    new : function(){
        Game.game_over = false;
        Game.score = 0;
        Game.ball_count = DEFAULT_BALL_COUNT;
        Game.balls = [];
        Display.switchMode( DISPLAY_MODE_TEXT );
         
        for(i=0;i<Game.ball_count;i++){
            //Game.balls[i] = new Ball(226,300);
            Game.balls[i] = new Ball(226,300);
            Game.balls[i].delta.y = -8.0;            
            //Game.balls[i].delta.x = 1.0+(Math.random()*2)/100;
        }        
    },

    update : function(){
        // Update table
        Table.update();
        
        // Update
        for(ball_index in Game.balls){
            var ball = Game.balls[ball_index];
            ball.update();
        }
        
        // Render
        for(ball_index in Game.balls){
            var ball = Game.balls[ball_index];
            Screen.putPixel(ball.x  , ball.y  ,198,198,198);        
            Screen.putPixel(ball.x+ball.delta.x  , ball.y+ball.delta.y  ,255,255,0,64);        
            
            Screen.putPixel(ball.x  , ball.y-1,255,255,255);
            Screen.putPixel(ball.x-1, ball.y  ,225,225,225);        
            Screen.putPixel(ball.x+1, ball.y  ,164,164,164);        
            Screen.putPixel(ball.x  , ball.y+1,124,124,124);        
            
        }
        Screen.line( 10, 10,110, 10,198,198,198);//     ¨
        Screen.line(110,110, 10, 10,128,128,128);//    \
        Screen.line( 60, 10, 60,110,128,128,128);//     |
        Screen.line( 10,110,110, 10,128,128,128);//      /
        Screen.line( 10, 60,110, 60,128,128,128);//     -
        Screen.line( 10,110, 10, 10,198,198,198);//    |
        Screen.line(110,110,110, 10, 88, 88, 88);//      |
        Screen.line(110,110, 10,110, 88, 88, 88);//     _
        
        
        Screen.update();
        if(!Game.step_by_step) setTimeout(Game.update, 1000/120);
    },
};
