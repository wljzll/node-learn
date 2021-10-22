// 流的特点以及最终解决的问题就是防止淹没可用内存
const fs = require("fs");
const path = require("path");
const buf = Buffer.alloc(3);

// r 读取 文件不存在就报错
// w 写入
// a 追加
// r+ 能读能写 以读取为准 文件不存在会报错
// w+ 能写能读 如果文件不存在会创建

// 读 写 执行 分成三部分 用三个数来标识 1 执行 4 读取 2代表写入 进制组合
// fs.open(path.resolve(__dirname, "note.md"), "r", 0o666, function (err, fd) {
//   // fd 文件描述符
//   console.log(fd); // 是一个数字类型 用完需要关闭
//   // buf:写入到哪个buffer中 0:从buffer的哪个位置写入 3:写入几个字节 0:从文件的第0个位置开始读取
//   fs.read(fd, buf, 0, 3, 0, function (err, bytesRead) {
//     // bytesRead 实际读取到的字节个数 以实际读取到的为准
//     console.log(bytesRead);
//     fs.open(path.resolve(__dirname, "copy.md"), "w", function (err, wfd) {
//       fs.write(wfd, buf, 0, 3, 0, function (err, bytesWriten) {
//         console.log(bytesWriten);
//       });
//     });
//   });
// });

fs.open(path.resolve(__dirname, "note.md"), "r", 0o666, function (err, fd) {
  // fd 文件描述符
  fs.open(path.resolve(__dirname, "copy.md"), "w", function (err, wfd) {
    function close() {
      fs.close(fd, () => {});
      fs.close(wfd, () => {});
    }
    function next() {
      fs.read(fd, buf, 0, 3, 0, function (err, bytesRead) {
        // bytesRead 实际读取到的字节个数 以实际读取到的为准
        console.log(bytesRead);
        if (bytesRead == 0) {
          return close();
        }
        fs.write(wfd, buf, 0, 3, 0, function (err, bytesWriten) {
          console.log(bytesWriten);
          next();
        });
      });
    }
    console.log(fd); // 是一个数字类型 用完需要关闭
    // buf:写入到哪个buffer中 0:从buffer的哪个位置写入 3:写入几个字节 0:从文件的第0个位置开始读取
    next();
  });
});
