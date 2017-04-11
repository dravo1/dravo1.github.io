//canvas气泡效果
	var canvas=document.getElementById("canvas");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight+400;
	var context=canvas.getContext('2d');
	var balls=[];
	var colors=['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900','#FF4E50','#F9D423'];
	var timer;
	
	function draw(ball){
		context.beginPath();
		context.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
		context.fillStyle=ball.color;
		context.fill();
	};
	
	//随机数
	function random(min,max){
		return Math.round(Math.random()*(max-min)+min);
	};
	
	canvas.onmousemove=function(ev){
		for(var i=0;i<2;i++){
			var ball={
				x:random(-5,5)+ev.clientX,
				y:random(-5.5)+ev.clientY+window.pageYOffset,
				r:random(10,45),
				vx:Math.random()-0.5,
				vy:Math.random()-0.5,
				color:colors[random(0,colors.length-1)]
			};
			
			balls.push(ball);
			if(balls.length>300){
				balls.shift();
			}
		}
		drallBall();
		function drallBall(){
			context.clearRect(0,0,canvas.width,canvas.height);
			
			for(var i=0;i<balls.length;i++){
				balls[i].x+=balls[i].vx*8;
				balls[i].y+=balls[i].vy*8;
				balls[i].r=balls[i].r*0.94;
				
				draw(balls[i]);
			}
		}
	};