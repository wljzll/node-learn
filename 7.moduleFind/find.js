// 模块的查找机制


const a = require('./a')
console.log(a);
// 自己文件的查找：
// 1. 相对路径说明要加载的是一个文件，内置模块和第三方模块不会添加相对路径，所以按照文件去查找
// 2. 给a尝试添加后缀，在当前目录下查找有没有对应后缀的文件(.js/.json......), 注意：但在有些老的node版本中，如果同名文件夹中有package.json文件，则会优先查找文件夹，而不是添加后缀查找文件; 
// 3. 如果步骤2没有查找到文件，则会找同名文件夹，默认会查找同名文件夹下的package.json文件，看入口文件是哪个，如果没有package.json，则默认查找index.js; 注意：某些老的版本可能会优先查找同名文件夹下的index.js，而不是根据package.json查找入口文件

// 新版本：先找文件 => 再找文件夹 找不到就报错


const b = require('b')
console.log(b, module.paths);
// 第三方模块的查找规则：
// 会先在自己目录下的node_modules下查找同名的文件夹，找不到则向上查找，一直查找到根目录位置，如果都找不到则报错
// [
//   "d:\\project\\node-learn\\7.moduleFind\\node_modules",
//   "d:\\project\\node-learn\\node_modules",
//   "d:\\project\\node_modules",
//   "d:\\node_modules",
// ];
  

