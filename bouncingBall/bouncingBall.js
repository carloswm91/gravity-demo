var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
ctx.canvas.height = 500;
ctx.canvas.width = 500;
document.body.appendChild(canvas);

var backgroundSet = function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'lightGrey';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

var setting = {
     gravity: 1,
     airResistance: .0001,
     friction: .1  
};
var ball = {
    x: ctx.canvas.width/2,
    y: ctx.canvas.height/5,
    radius: 20,
    velocity: 8,
    drawBall: function() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2); 
        ctx.closePath();
        ctx.fill();
    },
    isTouchingGround: function() {
    	if (this.y + this.radius > ctx.canvas.height)
    	{
    		return true;
    	}
    	else
    		return false;
    },
    fall: function() {
        this.velocity += setting.gravity;
        this.y += this.velocity;
        this.velocity -= (this.velocity * setting.airResistance);
   		
		if (this.isTouchingGround())
        {
        	this.bounce();
        };
    },
    bounce: function() {
    	this.y = ctx.canvas.height - this.radius //puts ball where its supposed to be
        this.velocity *= -1;  
        this.velocity -= (this.velocity * setting.friction);
    }
};
var update = function(modifier) {
   
	ball.fall();
};
var render = function() {
    backgroundSet();
    ball.drawBall();
};
var main = function() {
    var now = Date.now();
    var change = now - then;

    update(change/1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

requestAnimationFrame = window.requestAnimationFrame
					 || window.webkitRequestAnimationFrame
					 || window.msRequestAnimationFrame 
					 || window.mozRequestAnimationFrame;

then = Date.now();
main();