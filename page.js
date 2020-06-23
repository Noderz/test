var joystick = nipplejs.create({
	zone: document.getElementById('static'),
	mode: 'static',
	position: {left: '70px', bottom: '70px'},
	color: 'red'
});

/*joystick.on('dir:up',()=>{ // when 45 degree angle threshold reached
	simulateKey(83,'s','keyup');
	simulateKey(65,'a','keyup');
	simulateKey(68,'d','keyup');
	
	simulateKey(87,'w','keydown');
});
joystick.on('dir:down',()=>{ // when 45 degree angle threshold reached
	simulateKey(87,'w','keyup');
	simulateKey(65,'a','keyup');
	simulateKey(68,'d','keyup');
	
	simulateKey(83,'s','keydown');
});
joystick.on('dir:left',()=>{ // when 45 degree angle threshold reached
	simulateKey(87,'w','keyup');
	simulateKey(83,'s','keyup');
	simulateKey(68,'d','keyup');
	
	simulateKey(65,'a','keydown');
});
joystick.on('dir:right',()=>{ // when 45 degree angle threshold reached
	simulateKey(87,'w','keyup');
	simulateKey(83,'s','keyup');
	simulateKey(65,'a','keyup');

	simulateKey(68,'d','keydown');
});*/

joystick.on('move',(e,d)=>{
	console.log(d.direction);
	var c=d.direction,
		degree=d.angle.degree;
	console.log(degree);
	if(degree>=130 && degree<=160){ // up-left degree 160-130
		console.log('up-left');
		simulateKey(83,'s','keyup');
		simulateKey(65,'a','keydown');
		simulateKey(68,'d','keyup');
		simulateKey(87,'w','keydown');
	}
	else if(c.y=='up' && c.angle=='up'){ // generic up
		console.log('up');
		simulateKey(83,'s','keyup');
		simulateKey(65,'a','keyup');
		simulateKey(68,'d','keyup');
		simulateKey(87,'w','keydown');
	}else if(c.y=='down' && c.angle=='down'){ // generic down
		console.log('down');
		simulateKey(87,'w','keyup');
		simulateKey(65,'a','keyup');
		simulateKey(68,'d','keyup');
		simulateKey(83,'s','keydown');
	}else if(c.x=='left' && c.angle=='left'){ // generic left
		console.log('left');
		simulateKey(87,'w','keyup');
		simulateKey(83,'s','keyup');
		simulateKey(68,'d','keyup');
		simulateKey(65,'a','keydown');
	}else if(c.x=='right' && c.angle=='right'){ // generic right
		console.log('right');
		simulateKey(87,'w','keyup');
		simulateKey(83,'s','keyup');
		simulateKey(65,'a','keyup');
		simulateKey(68,'d','keydown');
	}else{
		console.log('not set, fix!');
		//console.log(d.direction);
	}
});

joystick.on('end',()=>{ // when 45 degree angle threshold reached
	simulateKey(87,'w','keyup');
	simulateKey(83,'s','keyup');
	simulateKey(65,'a','keyup');
	simulateKey(68,'d','keyup');
});

var template={
	altKey:false,
	bubbles:true,
	cancelBubble:false,
	cancelable:true,
	charCode:0,
	code:"Enter",
	composed:true,
	ctrlKey:false,
	currentTarget:null,
	defaultPrevented:true,
	detail:0,
	eventPhase:0,
	explicitOriginalTarget:document.body,
	isComposing:false,
	isTrusted:true,
	key:"Enter",
	keyCode:13,
	layerX:0,
	layerY:0,
	location:0,
	metaKey:false,
	originalTarget:document.body,
	rangeOffset:0,
	rangeParent:null,
	repeat:false,
	returnValue:false,
	shiftKey:false,
	srcElement:document.body,
	target:document.body,
	type:"",
	view:window,
	which:13
}
function simulateKey(keycode,keyname,keytype){
	var data=template;
	data.key=keyname;
	data.keyCode=keycode;
	data.code=keyname;
	data.which=keycode;
	data.type=keytype;
	if(keyname.length<=1 && keycode != ' ')data.code='Key'+keyname.toUpperCase();
	document.dispatchEvent(new KeyboardEvent(keytype, data));
};
var buttons=[
	{
		element:startButton=document.getElementById('start'),
		keycode:32,
		keyname:'Space'
	},
	{
		element:document.getElementById('left'),
		keycode:37,
		keyname:'ArrowLeft'
	},
	{
		element:document.getElementById('right'),
		keycode:39,
		keyname:'ArrowRight'
	},
	{
		element:document.getElementById('up'),
		keycode:38,
		keyname:'ArrowUp'
	},
	{
		element:document.getElementById('down'),
		keycode:40,
		keyname:'ArrowDown'
	},
	{
		element:document.getElementById('abutton'),
		keycode:76,
		keyname:'l'
	},
	{
		element:document.getElementById('bbutton'),
		keycode:188,
		keyname:','
	},
	{
		element:document.getElementById('crouch'),
		keycode:'k',
		keyname:'k'
	}
];

buttons.forEach((e,i,a)=>{
	e.element.addEventListener('touchstart',()=>{
		simulateKey(e.keycode,e.keyname,'keydown');
	});
	e.element.addEventListener('touchend',()=>{
		simulateKey(e.keycode,e.keyname,'keyup');
	});
	e.element.addEventListener('mousedown',()=>{
		simulateKey(e.keycode,e.keyname,'keydown');
	});
	e.element.addEventListener('mouseup',()=>{
		simulateKey(e.keycode,e.keyname,'keyup');
	});
});

document.addEventListener('keydown',e=>{
	buttons.forEach(ee=>{
		if(ee.keycode==e.which){
			ee.element.style.filter='brightness(125%)';
		}
	});
	//console.log('key: '+e.key+' type: '+e.type+' keycode: '+e.which)
});
document.addEventListener('keyup',e=>{
	buttons.forEach(ee=>{
		if(ee.keycode==e.which){
			ee.element.style.filter='';
		}
	});
	//console.log('key: '+e.key+' type: '+e.type+' keycode: '+e.which)
});

var Module = {
preRun: [],
postRun: [],
print: (function() {
  return function(text) {
	if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
	console.log(text);
  };
})(),
printErr: function(text) {
  if (arguments.length > 1)
	text = Array.prototype.slice.call(arguments).join(' ');
  console.error(text);
},
canvas: (function() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth; // Todo: how to do this from c++
  canvas.height = window.innerHeight;
  canvas.addEventListener("webglcontextlost", function(e) {
	alert('WebGL context lost. You will need to reload the page.');
	e.preventDefault();
  }, false);
  return canvas;
})(),
setStatus: function(text) {
}
};

if(parent.location.href.substr(location.origin.length,256)=='/?aa'){
	parent.location.href=location.href; // cool method
}
