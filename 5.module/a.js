// 第一版
// module.exports = 'hello'

// 第二版
// var a = 'hello'
// module.exports = a

// 第三版 验证require同步
// var a = 'hello'
// setTimeout(() => {
//     a = 'world'
// }, 1000);
// module.exports = a

// 第四版 引用类型修改
var a = {a:'hello'}
setTimeout(() => {
    a.a = 'world'
}, 1000);
module.exports = a