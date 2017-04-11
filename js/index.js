window.onload=function(){
	//扇形效果
	var nav=document.getElementById("nav");
	var lis=document.querySelectorAll("li");
	var as=nav.querySelectorAll('a');
	
	//给封面添加点击事件
	var clicked=true;
	lis[lis.length-1].onclick=function(){
		
		for(var i=0;i<lis.length;i++){
			var n=i-lis.length/2;
			
			if(clicked){
				n=n*15;
				
			}else{
				n=360;
			}
			lis[i].style.transform='rotate('+n+'deg)';
		}
		clicked=!clicked;
	}
	
	//给每一个li添加点击事件
	for(var i=0;i<lis.length-1;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			
			var leftDeg=0;
			var rightDeg=15;
			this.style.transform='rotate(0deg)';
			
			//left
			for(var i=this.index-1;i>=0;i--){
				leftDeg-=15;
				lis[i].style.transform='rotate('+leftDeg+'deg)';
			}
			
			//right
			for(var i=this.index+1;i<lis.length;i++){
				rightDeg+=15;
				lis[i].style.transform='rotate('+rightDeg+'deg)';
			}
			
			for(var i=0;i<as.length;i++){
				as[i].style.display='none';
				as[this.index].style.display='block';
			}
		}
	}
	
	
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
		context.globalCompositeOperation='lighter';	
		context.fill();
	};
	
	//随机数
	function random(min,max){
		return Math.round(Math.random()*(max-min)+min);
	};
	
	var on=true;
	canvas.onmousemove=function(ev){
		for(var i=0;i<2;i++){
			var ball={
				x:random(-4,4)+ev.clientX,
				y:random(-4,4)+ev.clientY+window.pageYOffset,
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
		
		if(on){
			clearTimeout(timer);
			timer=setInterval(drallBall,30);
			on=false;
		}
		
		
		function drallBall(){
			context.clearRect(0,0,canvas.width,canvas.height);
			
			for(var i=0;i<balls.length;i++){
				balls[i].x+=balls[i].vx*8;
				balls[i].y+=balls[i].vy*8;
				balls[i].r=balls[i].r*0.94;
				
				balls[i].index=i;
				
				if(balls[i].r<1){
					balls.splice(balls[i].index,1);
					continue;
				}
				
				draw(balls[i]);
				
				if(!balls.length){
					clearInterval(timer);
					on=true;
				}
			}
		}
	};
}