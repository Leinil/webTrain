let wholeDom = [];//初始化节点数组
let domIndex = 0;//初始化节点数
let inputDom = document.getElementById('textInput');
let inputContainer=document.getElementById('inputContainer');

//创建dom
function createDiv(type, innerHTML, id, className) {
    let newDom = document.createElement(type);
    newDom.id = id;
    newDom.className = className
    newDom.innerHTML = innerHTML;
    return newDom;
}

function clearNowHaveInputs(){ 
    var childs = inputContainer.childNodes; 
    for(var i = childs.length - 1; i >= 2; i--) { 
        inputContainer.removeChild(childs[i]); 
    }
}
//添加功能
function fangdou() {
    let time = null;
    return function (e) {
        var e = e || window.e;
        if (time) {
            clearTimeout(time);
        }
        time = setTimeout(function () {

            let newInputId = `input_${domIndex}`;
            let newInputText=e.target.value;//不带有spand的字符串便于之后的模糊查询
            let newInputValue = `${e.target.value}<span class='text_X'>X</span>`;
            if (e && e.keyCode === 13) {
                let ParentDom = document.getElementById('inputContainer');
                domIndex++;

                clearNowHaveInputs()

                wholeDom.forEach(item => {
                    let newInput = createDiv('div', item.value, item.key, 'input');
                    inputContainer.appendChild(newInput)
                })

                let newInput = createDiv('div', newInputValue, newInputId, 'input')
                ParentDom.appendChild(newInput);
                e.target.value = "";

                wholeDom.push({
                    'key': newInputId,
                    'value': newInputValue,
                    'text':newInputText
                })
            }
            else {//模糊查询部分
                if (newInputText!='') {//有值输入
                    let mingzhong = wholeDom.filter(item => {
                        return item.text.indexOf(newInputText) !== -1
                    })
                    clearNowHaveInputs()
                    mingzhong.forEach(item => {
                        let newInput = createDiv('div', item.value, item.key, 'input');
                        inputContainer.appendChild(newInput)
                    })
                }
                else {//无值输入（清空）
                    clearNowHaveInputs()
                    wholeDom.forEach(item => {
                        let newInput = createDiv('div', item.value, item.key, 'input');
                        inputContainer.appendChild(newInput)
                    })
                }
            }
        }, 100)
    }
}
inputDom.onkeydown = fangdou()

//删除功能
inputContainer.onclick = function (e) {
    var e = e || window.e;
    if (e.target.className === 'text_X') {
        let parent = e.target.parentNode.id;
        let deleteDom = document.getElementById(parent);
        inputContainer.removeChild(deleteDom);

        wholeDom.forEach((item,index)=>{
            if(item.key==parent){
                wholeDom.splice(index,1)
            }
        })
    }
}

//模糊查询
