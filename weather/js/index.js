(function(){
	var data=document.querySelector(".data");
	var dataH=data.querySelector('h4');
	var dataP=data.querySelector('p');
	var ul=document.querySelector(".bottom ul");
	var input=document.querySelector("input");
	var value=input.value;
	
	//时钟
	function time(){
		var d=new Date();
		dataH.innerHTML=''+d.getFullYear()+'.'+
							+format(d.getMonth()+1)+'.'+
							+format(d.getDate())+'周'
							+formatWeek(d.getDay())+' ';
		dataP.innerHTML=''+format(d.getHours())+':'
							+format(d.getMinutes())+':'
							+format(d.getSeconds());
	}
	function format(v){
		return v<10?'0'+v:''+v;
	}
	
	function formatWeek(v){
		return ['日','一','二','三','四','五','六'][v];
	}
	time();
	setInterval(time,1000);
	
	var btn=document.querySelector("button");
	btn.onclick=function(){
		value=input.value;
		jsonp({
			url:'http://wthrcdn.etouch.cn/weather_mini',
			data:{
				city:encodeURI(value)
			},
			succ:function(data){
				createDom(data);
			}
		});
	}
	
	jsonp({
		url:'http://wthrcdn.etouch.cn/weather_mini',
		data:{
			city:encodeURI(value)
		},
		succ:function(data){
			createDom(data);
			
		}
	});
	
	
		
	function createDom(data){
		var windH=document.querySelector(".wind h4");
		var windP=document.querySelector(".wind p");
		windH.innerHTML=data.data.forecast[0].fengxiang;
		windP.innerHTML=data.data.forecast[0].fengli;
		
		var rightH=document.querySelector(".right h3");
		var rightP=document.querySelector(".right p");
		rightH.innerHTML=data.data.wendu+'℃';
		rightP.innerHTML=data.data.forecast[0].type;
		
		ul.innerHTML='';
		var str='';
		for(var i=0;i<data.data.forecast.length;i++){
			str+=`<li>
					<h4>${data.data.forecast[i].date}</h4>
					<img src="img/ico_01.gif" />
					<p>${data.data.forecast[i].type}</p>
					<p>${data.data.forecast[i].low}/${data.data.forecast[i].high}</p>
				</li>`;
			
		}
		
		var img=document.querySelector(".left img");
		switch(data.data.forecast[0].type){
			case '阵雨':
				img.src='img/ico_06.gif';
				break;
			case '多云':
				img.src='img/ico_03.gif';
				break;
			case '晴':
				img.src='img/ico_10.gif';
				break;
		}
		ul.innerHTML=str;
		
		var ideaP=document.querySelector(".idea p");
		ideaP.innerHTML=data.data.ganmao;
		
		//无缝滚动
		var bottom=document.querySelector(".bottom");
		var spans=bottom.querySelectorAll("span");
		ul.innerHTML=ul.innerHTML+ul.innerHTML+ul.innerHTML;
		var lis=ul.querySelectorAll('li');
		var liW=lis[0].offsetWidth;
		ul.style.width=liW*lis.length+'px';
		ul.style.left=-liW*lis.length/3+'px';
		var n=lis.length/3;
		var timer;
		var moving=true;
		
		function circle(){
			move(ul,{left:-liW*n},700,'linear',function(){
				if(n===lis.length*2/3){
					n=lis.length/3;
				}
				if(n===lis.length/3-1){
					n=lis.length*2/3-1;
				}
				ul.style.left=-liW*n+'px';
				moving=true;
			});
			for(var i=0;i<lis.length;i++){
				lis[i].className='';
			}
			lis[n+1].className='grey';
		};
		spans[0].onclick=function(){
			if(!moving){
				return;
			}
			n--;
			moving=false;
			circle();
		};
		spans[1].onclick=function(){
			if(!moving){
				return;
			}
			n++;
			moving=false;
			circle();
		};
		//天气图标
		var imgs=ul.querySelectorAll("img");
		var sttr=data.data.forecast;
		var sttr1=sttr.concat(sttr,sttr);
		for(var i=0;i<sttr1.length;i++){
			switch(sttr1[i].type){
				case '雨夹雪':
					imgs[i].src='img/ico_01.gif';
					break;
				case '小雨':
					imgs[i].src='img/ico_02.gif';
					break;
				case '多云':
					imgs[i].src='img/ico_03.gif';
					break;
				case '小雪':
					imgs[i].src='img/ico_04.gif';
					break;
				case '阵雪':
					imgs[i].src='img/ico_05.gif';
					break;
				case '阵雨':
					imgs[i].src='img/ico_06.gif';
					break;
				case '晴转多云':
					imgs[i].src='img/ico_07.gif';
					break;
				case '雷阵雨':
					imgs[i].src='img/ico_08.gif';
					break;
					case '大雨':
					imgs[i].src='img/ico_09.gif';
					break;
				case '晴':
					imgs[i].src='img/ico_10.gif';
					break;
			}
		}
		
	}
})()
