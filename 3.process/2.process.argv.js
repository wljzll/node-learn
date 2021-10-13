// 2.process.argv

console.log(process.argv);

// 2.1) code runner 其实就是 node + 文件名
// [
//   'C:\\Program Files\\nodejs\\node.exe', // 可执行的node包
//   'd:\\project\\node-learn\\3.process.js' // 执行的文件
// ]

// 2.2) 命令行执行文件 node 3.process.js a b c d 
// [
//  'C:\\Program Files\\nodejs\\node.exe',  
//  'D:\\project\\node-learn\\3.process.js',
//  'a',
//  'b',
//  'c',
//  'd'
// ]

// 解析命令行参数
// let userObj = process.argv.slice(2).reduce((memo, current, index, arr) => {
//     console.log(memo, current, index);
//     if(current.includes('--')) {
//         memo[current.slice(2)] = arr[index + 1]
//     }
//     return memo
// }, {})
// console.log(userObj);