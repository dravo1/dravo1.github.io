var liBs=document.querySelectorAll('.head ul li');
var hide=document.querySelector('.head .hide');
var headDiv=hide.nextElementSibling;

/*head*/
liBs[4].onmouseover=function(){
	hide.style.display='block';
	headDiv.style.display='block';
}
liBs[4].onmouseout=function(){
	hide.style.display='none';
	headDiv.style.display='none';
}
/*nav*/
var nav=document.querySelector("nav");
var hovers=nav.querySelectorAll(".hover");
var pos=nav.querySelectorAll('.nav .hover .pos');
var kLis=nav.querySelectorAll('.kind li');

for(var i=0;i<hovers.length;i++){
	hovers[i].index=i;
	hovers[i].onmouseover=function(){
		var a=this.querySelector('.navs');
		var pos=this.querySelector('.pos');
		a.className='navs active';
		if(pos){
			pos.style.display='block';
			nav.style.height='157px';
			nav.style['border-bottom']='3px solid #ccc';
		}
	}
	hovers[i].onmouseout=function(){
		var a=this.querySelector('.navs');
		var pos=this.querySelector('.pos');
		a.className='navs';
		if(pos){
			pos.style.display='none';
			nav.style.height='35px';
			nav.style.border='none';
		}
	}
}
for(var i=0;i<pos.length;i++){
	pos[i].onmouseover=function(){
		this.style.display='block';
	}
}
for(var i=0;i<kLis.length;i++){
	kLis[i].index=i;
	kLis[i].onmouseover=function(){
		var a=this.lastElementChild;
		a.style.color='#b4a078';
	}
	kLis[i].onmouseout=function(){
		var a=this.lastElementChild;
		a.style.color='#000';
	}
}


/*banner轮播图*/
var ban=document.querySelector("#banner");
var bUl=document.querySelector("#banner ul");
var bPrev=ban.querySelector(".btn:first-of-type");
var bNext=ban.querySelector(".btn:last-of-type");
var bSpans=ban.querySelectorAll(".pic span");

bUl.innerHTML=bUl.innerHTML+bUl.innerHTML+bUl.innerHTML;
var bLis=bUl.querySelectorAll("li");
var bW=bLis[0].offsetWidth;
bUl.style.width=bW*bLis.length+'px';

var n=5;
var bTimer;
var moving=true;
/*轮播函数*/
function circle(){
	
	move(bUl,{left:-bW*n},1000,'linear',function(){
		if(n===10){
			n=5;
			bUl.style.left=-6745+'px';
		}
		if(n===4){
			n=9;
			bUl.style.left=-bW*n+'px';
		}
		for(var i=0;i<bSpans.length;i++){
			bSpans[i].className='';
		}
		bSpans[n-5].className='active';
		moving=true;
	});
}



bTimer=setInterval(function(){
	n++;
	circle();
},2000);

ban.onmouseover=function(){
	clearInterval(bTimer);
}
ban.onmouseout=function(){
	bTimer=setInterval(function(){
		circle();
	},2000);
}
bPrev.onclick=function(){
	if(!moving){
		return;
	}
	n--;
	moving=false;
	circle();
}
bNext.onclick=function(){
	if(!moving){
		return;
	}
	n++;
	moving=false;
	circle();
}

for(var i=0;i<bSpans.length;i++){
	bSpans[i].index=i;
	bSpans[i].onclick=function(){
		n=this.index+5;
		
		circle();
	}
}


/*吸顶*/
var a1=nav.querySelector('.a1');
var a2=nav.querySelector('.a2');
var titleTimer=setInterval(function(){
	if(window.pageYOffset>=200){
		a1.style.display='none';
		a2.style.display='block';
	}else{
		a1.style.display='block';
		a2.style.display='none';
	}
},100)


/*新品首发*/
var newShop=document.querySelector("#newShop");
var newLbtn=newShop.querySelector('.btnLeft');
var newRbtn=newShop.querySelector('.btnRight');
var nBox=newShop.querySelector('.box');
var newUl=nBox.querySelector('ul');
var newLi=nBox.querySelectorAll('li');
var nW=newLi[0].offsetWidth;
var m=0;



newUl.style.width=nW*newLi.length+'px';
var ulWid=newUl.offsetWidth;

newLbtn.onclick=function(){
	if(!moving){
		return;
	}
	m--;
	moving=false;
	if(m<=0){
		m=0;
	}
	move(newUl,{left:-nW*m},300,'linear',function(){
		moving=true;
	});
}
newRbtn.onclick=function(){
	if(!moving){
		return;
	}
	m++;
	moving=false;
	if(m>=7){
		m=7;
	}
	move(newUl,{left:-nW*m},300,'linear',function(){
		moving=true;
	});
}


/*人气推荐  选项卡*/
var pop=document.querySelector("#pop");
var as=pop.querySelectorAll('.title a');
var imgs=pop.querySelectorAll('.img');

for(var i=0;i<as.length-1;i++){
	as[i].index=i;
	as[i].onclick=function(){
		for(var n=0;n<as.length-1;n++){
			imgs[n].style.display='none';
		}
		imgs[this.index].style.display="block";
	}
}


/*大家都在说	轮播图*/
var op=document.querySelector("#opinion");
var oUl=op.querySelector('ul');
var oPrev=op.querySelector('a:first-of-type');
var oNext=op.querySelector('a:nth-of-type(2)');
var oTimer;

oUl.innerHTML=oUl.innerHTML+oUl.innerHTML+oUl.innerHTML;
var oLi=op.querySelectorAll('li');
var oW=oLi[0].offsetWidth+12;
oUl.style.width=oW*oLi.length+'px';

var h=8;

function circle2(){
	move(oUl,{left:-oW*h},1000,'linear',function(){
		if(h===16){
			h=8;
			oUl.style.left=-oW*h+'px';
		}
		if(h===7){
			h=15;
			oUl.style.left=-oW*h+'px';
		}
		moving=true;
	});
}

oTimer=setInterval(function(){
	h++;
	circle2();
	
},2000)

op.onmouseover=function(){
	clearInterval(oTimer);
}
op.onmouseout=function(){
	setInterval(oTimer);
}

oPrev.onclick=function(){
	if(!moving){
		return;
	}
	h--;
	moving=false;
	circle2();
}
oNext.onclick=function(){
	if(!moving){
		return;
	}
	h++;
	moving=false;
	circle2();
}


/*return top*/
var toTop=document.querySelector("#toTop");
var tAs=toTop.querySelectorAll('.con1 a');
var tLast=toTop.querySelector('.last');
var imgArr1=['img/pic_13.gif','img/pic_14.gif','img/pic_15.gif'];
var imgArr2=['img/pic_10.gif','img/pic_11.gif','img/pic_12.gif'];
var topTimer;

for(var i=0;i<tAs.length;i++){
	tAs[i].index=i;
	tAs[i].onmouseover=function(){
		var img=this.querySelector('img');
		img.src=imgArr1[this.index];
	};
	tAs[i].onmouseout=function(){
		var img=this.querySelector('img');
		img.src=imgArr2[this.index];
	};
}
topTimer=setInterval(function(){
	if(window.pageYOffset>=600){
		tLast.style.display='block';
	}else{
		tLast.style.display='none';
	}
},100)

