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
const vm = require('vm') // 使用场景很少 一般都是源码中使用

let a = 1;
// vm.runInThisContext('console.log(a)') // a is not defined
vm.runInThisContext('console.log(100)') // 100 用法很像eval 但是执行字符串时是一个沙箱环境
console.log(vm.runInThisContext('console.log(100)'));

// 2) fs模块
const fs = require('fs') // 文件操作可能会出的问题 就是路径的问题


// 3) path模块
const path = require('path')
console.log(__dirname); // d:\project\node-learn\5.module
console.log(path.join(__dirname, 'name.txt')); // d:\project\node-learn\5.module\name.txt

// path.resolve()解析出一个绝对路径 如果只传入一个参数 就是用process.cwd()来解析出路径
console.log(path.resolve('name.txt')); // d:\project\node-learn\name.txt
console.log(path.resolve(__dirname, 'name.txt')); // d:\project\node-learn\5.module\name.txt

// join()和resolve的注意点
// join 支持 /
// resolve 遇到 / 就变成了根路径
