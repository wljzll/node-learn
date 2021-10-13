// node中的全局对象
// window    global
// this      this不是global

console.log(this); // {}
console.dir(global, {showHidden: true});

// global上的部分属性：

// global
// clearInterval
// clearTimeout
// setInterval
// setTimeout
// queueMicrotask // 微任务 11版本后才有的
// clearImmediate
// setImmediate // 宏任务
// process 进程
// Buffer 二进制


// global上的属性的特点：
// 1. global中的属性可以直接访问到

// require module exports __filename__ __dirname__ 这几个都不是global上的属性 但是可以直接被访问(函数的参数)
