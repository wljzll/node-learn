const fs = require("fs");
const path = require("path");
const WriteStream = require('./4.writeStream')

const ws = new WriteStream(path.resolve(__dirname, "note.md"), {
  flag: "w",
  encoding: null,
  mode: 0o666,
  autoClose: true,
  emitClose: true,
  start: 0,
  highWaterMark: 2, // 水位线 我预期用多少空间来做这件事 但是超过预期依然可用
});

ws.on("open", function (fd) {
  console.log("open", fd);
});

// let flag = ws.write('珠', 'utf-8', function () {
//     console.log('写入成功');
// })

let index = 0;
function write() {
  let flag = true;
  while (index != 10 && flag) {
    flag = ws.write(index++ + "");
  }
}
write();
ws.on("drain", function () {
  write();
  console.log("drain");
});

// ws.end(); // 表示写入完成 可以写入一些最终的内容 并关闭文件  = ws.write() + fs.close()
