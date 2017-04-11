var canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight+400;
var context=canvas.getContext('2d');
var balls=[];
var colors=['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900','#FF4E50','#F9D423'];
var timer;

function draw(ball){
	context.beginPath();		//开始的路径
	context.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
	context.fillStyle=ball.corlor;	//给圆填充颜色
	context.fill();
}
function random(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
canvas.onmousemove=function(ev){

	for(var i=0;i<2;i++){
		var ball={
			x:random(-5,5)+ev.clientX,
			y:random(-5,5)+ev.clientY+window.pageYOffset,
			r:random(10,45),
			vx:Math.random()-0.5,
			vy:Math.random()-0.5,
			corlor:colors[random(0,colors.length-1)]
		};
		
		balls.push(ball);
		if(balls.length>300){
			balls.shift();
		}
	}
	
	function drallBall(){
		context.clearRect(0,0,canvas.width,canvas.height);
		
		for(var i=0;i<balls.length;i++){

			balls[i].x+=balls[i].vx*8;		//通过速度改变x轴的位置
			balls[i].y+=balls[i].vy*8;		//通过速度改变y轴的位置
			balls[i].r=balls[i].r*0.94;		//改变球的半径
			
			draw(balls[i]);
			
			}
		}
	}
};