IE的事件流特殊之处
	事件对象的兼容性
  和事件处理程序一样，事件对象的属性和方法也存在兼容性问题。

事件对象的获取   在IE8及以前的版本中，通过设置属性注册事件处理程序时，调用的时候并未传递事件对象，需要通过全局对象window.event来获取,解决方式如下:

function getEvent(event){
    event = event || window.event
}
function hander(event){
    event = getEvent(event)
    ...
}

复制代码
阻止默认事件行为
  IE浏览器的event事件没有preventDefault()这个方法，但是可以通过设置event的returnValue值为false来达到同样的效果，如下:


window.event.returnValue=false;

复制代码
阻止冒泡
  IE浏览器的event对象也没有stopPropagation()方法，但可以设置cancelBubble属性为true，阻止事件的继续传播，如下:


window.event.cancelBubble=true; 
