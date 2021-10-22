const fs = require('fs');
const path = require('path')

// 什么时候用同步? 什么时候用异步?
// 启动服务之前,可以同步读取一些配置文件
// 如果服务运行起来了 就不要采用同步读取了


// I/O文件的读和写
// 读: 读取的概念是把读取到的内容放到内存中
// 写: 读取内存中的内容写入到文件中


// 读取文件的时候不存在会报错, 写入文件的时候文件不存在会创建文件 如果文件存在 会清空文件的内容
fs.readFile(path.resolve(__dirname, 'note.md'), 'utf-8', function(err, data) {
   fs.writeFile(path.resolve(__dirname, 'noteCopy.md'),data, function (err) {
       console.log('写入成功', err);
   })
})


// 这个方式不适合大文件的读取,如果是简单的文件可以使用上面的方式, 对于大文件来说我们操作全部使用的是流,流的特点是有方向,从一个地方到另一个地方
// fs.open() fs.read() fs.write()