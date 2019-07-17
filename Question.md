对于setimeout函数的运行顺序的理解、以及其作用域的理解
在做其他的项目实践的时候，遇到了怎么处理react（‘原生’）的css模块化问题
怎么根据后台返回的数据批量生成dom元素（插入到dom中，异步问题）
react16之后怎么实现commentWillmound的功能呢
关于xmlrequest的body啊，param啊。那些参数，在谢老师的项目中遇到过的，那些具体的参数细分化了解
什么时候看作用域、什么时候看执行上下文
原型链实现继承的具体用法（再了解一下这种继承的做法和问题）

[](https://react.docschina.org/docs/handling-events.html)事件处理这一节
1.向事件处理程序传递参数 中为什么e在箭头函数中要显示传递	
2.class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，
这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。
这个是为什么会重新渲染

react中的portals理解不够，其事件冒泡之后的那部分没看清楚
