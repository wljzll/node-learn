// 宏任务 
// setTimeout setInterval
// I/O操作 fs.readFile()等文件的读写

// 微任务
// process.nextTick()

// fs.readFile() 放在poll队列中 检索新的I/O事件;执行与 I/O相关的回调
// process.nextTick() 是有专门的空间存放的


// 这两个的回调函数的执行顺序是不确定的 看电脑的性能 (setImmediate setTimeout) (setTimeout setImmediate)
// 如果在主模块中调用 执行顺序是不确定的
// setTimeout(() => {
//     console.log('setTimeout');
// }, 0);

// setImmediate(()=> {
//     console.log('setImmediate');
// })


// 在I/O的回调中执行 这种情况下 setImmediate先执行 优先级高
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
    
    setImmediate(()=> {
        console.log('setImmediate');
    })
})

// node中的任务队列
// timer 存放定时器
// poll  轮询，处理I/O回调
// check 存放setImmediate

// node11以后 node的事件环表现和浏览器相同


// 案例：
Promise.resolve().then(()=> { // then1
    console.log(1);
    Promise.resolve().then(()=> { // then11
        console.log(11);
    }).then(()=> { // then22
        console.log(22);
    }).then(()=> { // then33
        console.log(33);
    })
}).then(() => { // then2
    console.log(2);
}).then(()=> { // then3
    console.log(3);
})

/**
 * 主线程开始执行代码, 首先执行Promise.resolve()
 * 1. 将then1放入微任务队列中 [then1]
 * 2. 主线程执行完成, 宏任务执行完, 开始清空微任务队列, 执行then1, 输出1, 执行Promise.resolve()将then11放入微任务队列 [then11]
 * 3. then1执行完毕, 将then2加入微任务队列 [then11, then2], 本轮宏任务执行完毕, 开始清空微任务队列
 * 4. 执行then11, 输出 11, 同时将then22加入到微任务队列中 [then2, then22]
 * 5. 执行then2, 输出2, 同时将then3加入微任务队列中 [then22, then3]
 * 6. 执行then22, 输出22, 同时将then33加入到微任务队列中 [then3, then33]
 * 7. 执行then3, 输出3
 * 8. 执行then33, 输出33
 */

async function async1() {
    console.log('async1 start');
    await async2()
    console.log('OK');
}

async function async2() {
    console.log('async2');
}

console.log('script start');
setTimeout(() => {
    console.log('setTimeout');
}, 0);
async1()
new Promise(function(resolve){
    console.log('promise1');
    resolve()
}).then(()=> {
    console.log('script end');
})

// script start async1 start async2 promise1 script end setTimeout