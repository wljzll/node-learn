// process.env 环境变量 (全局环境变量/局部环境变量)
console.log(process.env);

// 1. 全局环境变量：在计算机中配置的环境变量叫做全局环境变量 可以在cmd中通过path路径查看
// PATH=
// C:\Program Files (x86)\Common Files\Oracle\Java\javapath;
// C:\windows\system32;C:\windows;C:\windows\System32\Wbem;
// C:\windows\System32\WindowsPowerShell\v1.0\;
// C:\windows\System32\OpenSSH\;
// D:\software\git\Git\cmd;
// C:\Program Files\Java\jdk1.8.0_291\bin;
// C:\Program Files\Java\jdk1.8.0_291\jre\bin;
// D:\software\tortoiseGit\bin;%NVM_HOME%;%NVM_SYMLINK%;
// C:\Users\zoulele\AppData\Local\Microsoft\WindowsApps;
// C:\Users\zoulele\AppData\Roaming\npm;
// D:\software\vscode\Microsoft VS Code\bin;
// D:\software\nvm-setup\nvm;
// C:\Program Files\nodejs

// 2. 局部环境变量设置的方式
// 2.1) set key = value windows下设置环境变量
// 2.2) export key = value  Mac/PowerShell下设置环境变量
// 2.3) cross-env 跨平台设置环境变量

// 局部环境变量在哪里设置在哪里生效 在其他地方运行不生效

// 案例：
// 在cmd下 在node-learn文件夹下运行命令： set A=1
// 然后执行node 3.process.js 我们可以发现环境变量中有A
// node "d:\project\node-learn\3.process.js" 这样是拿不到的 或者直接run code也拿不到
