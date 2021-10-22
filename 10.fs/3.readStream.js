const fs = require("fs");
const path = require("path");

const stream = require('stream');
const ReadStrem = require('./ReadStream')

// 文件流是文件操作中自己实现的流 文件流是继承于stream的, 底层实现用的是 fs.open() fs.read()

const rs = fs.createReadStream(path.resolve(__dirname, 'note.md'), {
    flags: 'r', // r读取 fs.open()用
    encoding:null, // 默认读取出来的是buffer类型
    autoClose: true, // 读取完毕后需要关闭流 fs.close
    emitClose: true, // 读取完毕后要触发close事件 emit('close')
    start: 0,
    end: 5, // start end 标识就是读取从索引为 0-5的内容
    highWaterMark: 2 // 每次读取几个
})

rs.on('open', function (fd) { // 打开文件后会传递fd属性 open是文件流特有的
    console.log(fd);
})

const arr = [];
rs.on('close', function() {
    console.log('close');
})

rs.on('data', function (data) { // 如果绑定了data事件, 会不停的触发data事件 将内部数据传递出来
   console.log(data);
   rs.pause() // 不要继续触发data事件, 暂停读取文件
   arr.push(data)
})

rs.on('end', function () {
    console.log(Buffer.concat(arr).toString());
})

setInterval(() => {
    // rs.resume() // 恢复触发data事件 继续读取文件
}, 1000);