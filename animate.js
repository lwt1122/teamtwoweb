
var box= document.getElementById("box");
var oNavlist = document.getElementById("nav").children;
var remind = document.getElementById("remind");
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var hidden = document.getElementById("hidden");
var index = 1;
var distance = 0;

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}

function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}


function next(){
	index++;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index===6){
			slider.style.left="-1200px";
			index = 1;
		}
	});
}
	
function prev(){
	index--;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index===0){
			slider.style.left="-6000px";
			index = 5;
		}
	});
}
function wordmove(){
	distance++;
	animate(remind,{left:800-distance*2},function(){
		if(remind.style.left=="-306px"){
			remind.style.left="800px";
			distance=0;
		}				
	});
}
setInterval(wordmove,100);



var timer = setInterval(next,3000);
box.onmouseover = function(){
	animate(left,{opacity:50})
	animate(right,{opacity:50})
	clearInterval(timer);
}
box.onmouseout = function(){
	animate(left,{opacity:0})
	animate(right,{opacity:0})
	timer = setInterval(next,3000);
}
right.onclick=next;
left.onclick=prev;
for(var i=0;i<oNavlist.length;i++){
	oNavlist[i].idx = i;
	oNavlist[i].onclick=function(){
		index = this.idx+1;
		navChange();
		animate(slider,{left:-1200*index})
	}
}
function navChange(){
	for(var i=0;i<oNavlist.length;i++){
		oNavlist[i].className= "";
	}
	if(index===6){
		oNavlist[0].className = "active";
	}else if(index===0){
		oNavlist[4].className = "active";
	}else{
		oNavlist[index-1].className = "active";
	}

}
