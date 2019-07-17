//实现new
// function create() {
// 	let obj = {};
// 	let fun = [].shift.call(arguments); //获取传入的方法,剩下的就是传入的参数
// 	obj.__proto__ = fun.prototype;
// 	let ret = fun.call(obj, arguments);
// 	return ret instanceof Object ? ret : obj;
// };



//实现call(基础->完整)
// Function.prototype.call2=function(params){
// 	params.func=this;//this获取testCall
// 	func.();//这时的this中的this就是我传入的对象了(obj)
// 	delete params.func;
// }
// 
// var obj={
// 	a:1
// }
// function testCall(){
// 	console.log(this.a);
// }
// testCall.call2(obj)

Function.prototype.call = function (context) {
  context = context ? Object(context) : window; //Object（）是为了将基本类型转为对象
  context.fn = this;

  let args = [...arguments].slice(1);//只设用于es6
  let result = context.fn(...args);

  delete context.fn
  return result;
}