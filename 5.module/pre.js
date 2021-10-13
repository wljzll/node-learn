// 如何让一个字符串执行
// 1. eval
// 2. new Function

const a = 1
eval('console.log(a)') // 1 eval执行时 会导致产生作用域问题 会向上查找变量


// new Function()最后一个参数是函数体，前面的参数是函数的参数
let func = new Function('console.log(a)')
console.log(func.toString());
func(); // a is not defined new Function默认不会向上级作用域查找变量

let func1 = new Function('a', 'console.log(a)')
func1(100) // 100


// node中实现模块化靠的不是new Function 靠的是自己的核心模块

// 1) 虚拟机模块



// 2) fs模块



// 3) path模块
