//普通的async函数
async function test(){
    let a=await  new Promise((resolve,reject)=>{
        resolve(1)
    })
    return a;
}
test().then((data)=>{
    console.log(data);
})

//并发的async函数（await只能用在async函数中）这种是在async函数中的同步处理
//需要注意的是 在async函数中的数组map等操作时，如果map函数也是async函数类型的，那么map里面的async只对自己产生影响，实际的每一个map函数触发是同步的
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;