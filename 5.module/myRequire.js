const vm = require("vm");
const path = require("path");
const fs = require("fs");

/**
 *
 * @param {String} id 文件的绝对路径
 */
function Module(id) {
  this.id = id;
  this.exports = {};
}

Module.warpper = [
  `(function(exports,require,module,__filename,__dirname){`,
  `})`,
];

Module._extensions = {
  ".js"(module) {
    // 1. 读取JS文件内容
    let content = fs.readFileSync(module.id, "utf-8");
    content = Module.warpper[0] + content + Module.warpper[1];
    // 2. 使用vm.runInThisContext()执行JS内容
    let fn = vm.runInThisContext(content);

    let exports = module.exports;
    let dirname = path.dirname(module.id); // d:\project\node-learn\5.module
    console.log(dirname);
    fn.call(exports, exports, myRequire, module, module.id, dirname);
    console.log(fn.toString());
  },
  ".json"(module) {
    let content = fs.readFileSync(module.id, "utf-8"); // 读取文件内容
    module.exports = content; // 将内容直接挂载到 module实例的exports属性上
  },
};

Module._resolveFilename = function (filename) {
  let absPath = path.resolve(__dirname, filename); // 获取文件的绝对路径 d:\project\node-learn\5.module\a
  let isExists = fs.existsSync(absPath); // 判断文件是否存在 由于为传入文件名 所以时不存在的
  if (isExists) {
    return absPath;
  } else {
    let keys = Object.keys(Module._extensions); // [ '.js', '.json' ]
    for (let i = 0; i < keys.length; i++) {
      let newPath = absPath + keys[i];
      let flag = fs.existsSync(newPath);
      if (flag) {
        return newPath;
      }
    }
  }
  throw new Error("module not exists");
};
Module.prototype.load = function () {
  let extName = path.extname(this.id); // 获取文件后缀名 .json
  Module._extensions[extName](this); // 调用对应的方法加载文件
};

Module._cache = {}

function myRequire(filename) {
  filename = Module._resolveFilename(filename); // 获取模块的绝对路径 d:\project\node-learn\5.module\name.json
  let cacheModule = Module._cache[filename]
  if(cacheModule) {
      return cacheModule.exports
  }
  let module = new Module(filename);
  Module._cache[filename] = module
  module.load(filename);

  return module.exports;
}
let result = myRequire("./b");
console.log(result);
