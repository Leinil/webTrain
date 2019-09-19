// console.log(1)
// let promiseDemo = new Promise((resolve, reject) => {
//     console.log(2)
//     setTimeout(() => {
//         let random = Math.random()
//         if (random >= 0.2) {
//             resolve('success')
//             console.log(3)
//         } else {
//             reject('failed')
//             console.log(3)
//         }   
//     }, 1000)
// })

// async function test() {
//     console.log(4)
//     let result = await promiseDemo
//     return result
// }

// test().then(result => {
//     console.log(5)
// }).catch((result) => {
//     console.log(5)
// })

// console.log(6)

async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout')
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')