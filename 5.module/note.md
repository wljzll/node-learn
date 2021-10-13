## 常见的模块
- es6Module (import/export)
- commonjs规范(require/module.export)
- seajs(cmd) 过时了
- requirejs(amd) (define require) 过时了
- 项目打包 umd 统一模块规范(可以兼容 commonjs + amd + cmd + 挂载到全局)


## 模块化的好处
- 解决命名冲突问题, 如果用唯一标识解决冲突问题 会导致调用时 路径过长
```
var obj = {
    a(){}, 
    b(){},
    c(){}
}
var obj2 = {}
```
- 方便管理我们的代码(一个文件一个功能 每个文件都是一个模块)


## commonjs模块化的规范
- 每个文件都是一个模块
- 我要给别人使用，就用module.exports 导出要给别人用的内容
- 别人用我的模块，就用require 去引用我们导出的模块

> es6模块叫静态导入 es6模块会有变量提升 import()这个实验语法支持动态导入
  commonjs动态导入
- require原理是使用fs模块同步读取要加载的文件

## node的模块分类
- 1. 核心模块(fs, path, util)
- 2. 自定义文件模块
- 3. 第三方模块 类如commander 需要安装 但是和核心模块使用方式一致


## node中require方法实现的大致流程：
- 1. Module.prototype.require 实现一个require
- 2. Module._load加载模块
- 3. 加载模块时 会查看是否有缓存，有缓存则使用缓存，没有则加载模块
- 4. 如果没有缓存就直接将模块路径转换成绝对路径 Module.resolveFilename
- 5. 根据转化的路径再查看是否有缓存机制，如果没有缓存看一下是否是原生的模块
- 6. new Module 创建模块，id(唯一的路径)、exports(导出的结果 {})有这两个主要的属性
- 7. 把模块缓存起来，供下次使用
- 8. module.load 加载模块
- 9. 拿到文件的扩展名，在Module._extensions调用对应的模块解析规则
- 10. 读取文件模块，编译模块
- 11. 包装成函数 并且让函数执行 模块的this指代的是 exports对象 exports require module __dirname __filename
- 12. 最终require的返回结果就是module.exports的结果