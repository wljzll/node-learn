## （一） npm 是node的包管理器，管理的都是node的模块
- 3n: nrm nvm npm
- nrm: node中源管理工具
- nvm: node中的版本管理工具
- npm: node的包管理工具


## （二）第三方模块分为两种：
- 全局模块(只能在命令行中使用，任何路径下都可以使用)
- 本地模块(开发或者上线时使用的)

## （三）包的初始化
```bash
npm init -y
```

## （四）全局模块的安装
```bash
npm install nrm -g
npm install nrm -g --registry http://registry.npm.taobao.org // 设置淘宝源
```
> C:\Users\zoulele\AppData\Roaming\npm\nrm -> C:\Users\zoulele\AppData\Roaming\npm\node_modules\nrm\cli.js

> 为什么npm和node能够在全局任何地方运行：因为在计算机中配置了环境变量path
> nrm在path中并没有环境变量为什么还能全局访问：将当前安装的模块，放到npm的目录下(相当于生成nrm的快捷键)，当我们执行nrm命令时，会去执行npm目录下的node_modules中nrm中的cli.js文件

## （五）nrm常用命令：
- `nrm ls` 列出所有可用的源
```javascript
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

```
- `nrm use` 切换npm的源 其实就是在操作npm的配置文件，修改registry项
- `nrm current`

## （六）自己如何编写全局包：编写computed包：执行computed 1 2 3 4 输出1234
- 1. 新建bin文件夹

- 2. 在bin文件夹内新建computed.js文件

- 3. 在package.json文件中添加脚本
```javascript
"bin": {
    "computed": "./bin/computed.js"
}, // 意思是当我们在命令行中执行computed命令时，就是去执行bin目录下的computed.js
```
- 4. 如何把这个包放到全局：1) 上传到npm上，然后再全局安装; 2) 临时拷贝(npm link)，临时链接到全局中去
```javascript
// 执行npm link后
C:\Users\zoulele\AppData\Roaming\npm\computed -> C:\Users\zoulele\AppData\Roaming\npm\node_modules\my-zf-pack\bin\computed.js
C:\Users\zoulele\AppData\Roaming\npm\node_modules\my-zf-pack -> D:\project\node-learn\6.npm
```
- 5. 在编写的JS文件顶部添加命令：
```javascript
#! /usr/bin/env node   // 以什么方式来运行
```

- 6. 重新执行`npm link`, 此时如果报错执行`npm link --force`
- 7. 执行`npm unlink`卸载

## （七）安装项目包：
- 1) npm i webpack --save-dev 
> --save-dev可以简写成-D,表示是开发依赖
```javascript
// 开发依赖
"devDependencies": {
    "webpack": "^5.58.2"
  }

```

- 2) npm i jquery
> 不加任何参数，表示安装的是生产依赖 或者添加 --save(-S)命令
```javascript
// 生产依赖
"dependencies": {
    "jquery": "^3.6.0"
}
```

- 3) 同等依赖：当我们安装node_modules时，会提醒我们项目需要安装一个3.6.0版本的jQuery
```javascript
"peerDependencies": {
    "jquery": "^3.6.0"
}
```

- 4) 打包依赖： 执行npm pack打成压缩包时，会将jquery这个包打进去，也就是会将node_modules打包，里面会有jquery的包
```javascript
"bundleDependencies": [
    "jquery"
  ],
```

- 5) 可选依赖：可安装可不安装
```javascript
"optionalDependencies": {
    "jquery": "^3.6.0"
  }
```

## （八）package.lock.json
- 锁定版本

## （九）版本问题
- major: 大版本更新，破坏性更新 
- minor: 修订大版本中的功能
- patch: 修改小的bug
- major.minor.patch(组成三位版本号)

- ^ : 限制大版本，major位不能边，比如 ^2.0.0，就是版本不能小于2.0.0，也不能大于3.0.0，
- ~ : 限制中间版本，major和minor不能变，比如~2.3.0，前两位只能是2.3，后面的随便
- >=
- <=
- 1.0.0-2.0.0
- alpha: 预览版（内部测试的版本）
- beta: 公测版本 @3.0.0-beta
- rc: 最终测试版
- rc没问题就可以上线了

## （十）将包安装到项目中时，怎么使用

```javascript
"scripts": {
    "computed": "node ./bin/computed.js",
    "mime": "mime"
},
```
> 当我们执行 `npm run mime`时，为什么能够跑mime这个包，因为当我们执行 npm run 时会将 局部的node_modules/.bin目录添加到全局环境中，运行完毕后再删除

## （十一）npx的使用
- npx 运行的包如果不存在，npx会先去下载下来，运行完毕再删除，如果有这个包，会直接复用