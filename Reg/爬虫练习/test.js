import {string} from './doubanYuanma.js';
var titleArr=[];
var author=[];

var qukong=/\s*/g;

var getH2String=/<h2 class="">([\n*|\s*|.*]*)*/g;
var getTitleString=/<a.*>/g;

var pubString=/<div class="pub">\n*\s*.*/g;
var getAuthor=/>([^\/]*)\//g;
function getTitle(arr){
	var arrToStr=arr;
	console.log(arrToStr[0]);
	// console.log(arrToStr.match(getTitleString))
    // arr.map(function(item){
    //     var hasTitle=getTitleString.test(item);
    //     if(hasTitle){   //这个地方直接getTitleString.test(item)不行？
    //         getTitleString.exec(item)//30
    //         item.match(getTitleString);//60
    //         titleArr.push(RegExp.$1);
    //     }
    // })
}

function getPub(arr){
    arr.map(function(item){
        item=item.replace(qukong,'');//item 类似<divclass="pub">[日]东野圭吾/刘姿君/南海出版公司/2008-9/29.80元
        getAuthor.exec(item)
        item.match(getAuthor)
		author.push(RegExp.$1)
    })
}

function dataToJson(title,author){
	var jsonData=[];
	if(title.length===author.length){
		title.map(function(item,index){
			let obj={};
			obj['title']=item;
			obj['author']=author[index];
			jsonData.push(obj)
		})
	}
	else{
		console.log("匹配的标题与作者数量并不相同")
	}
	return JSON.stringify(jsonData);
}

getTitle(string.match(getH2String));
// getPub(string.match(pubString));
// // console.log(titleArr)
// // console.log(author)
// var finalData=dataToJson(titleArr,author);
// console.log(finalData)