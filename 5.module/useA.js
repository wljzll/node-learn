// 第一版
// let result = require('./a')
// console.log(result);

// 第二版
// var a = 'hello'
// let result = require('./a')
// console.log(result);

// // 第二版其实内部做了这些事
// var a = 'hello'
// let result = function () {
//     // 读取a.js文件放在自执行函数中执行
//     var a = 'hello'
//     module.exports = a;
//     return module.exports
// }
// 模块化的实现原理：就是通过函数来隔离作用域(会将module.exports 返回给当前内容)


// 第三版
let result = require('./a')
setTimeout(() => {
    console.log(result);
}, 2000);