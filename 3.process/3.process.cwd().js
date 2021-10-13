
// 3. process.cwd() 当前的工作目录 默认coder runner 运行时是以当前文件夹的根目录未基准 这个就是当前的工作目录
console.log(process.cwd()); // 用coder runner运行  [d:\project\node-learn]
// 在project文件夹下 以node命令运行 node .\node-learn\3.process.js cwd()就是 [D:\project]

// 这个cwd()是可变的 看命令在哪里执行 在哪执行工作目录就是谁


// __dirname: 当前文件所在的文件夹 此路径是不会发生变化的 所以在操作文件时 为了防止有歧义：__dirname + 文件名
console.log(__dirname);