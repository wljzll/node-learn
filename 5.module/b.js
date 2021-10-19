// 模块内的this就是module实例的exports属性
// 模块内的exports就是module.exports
// 模块内的module就是module实例

this.a = 1 // this就是module的exports属性
exports.b = 2 // exports就是module的exports属性
module.exports = 3 // module就是module实例  Module { id: 'd:\\project\\node-learn\\5.module\\b.js', exports: 3 }
