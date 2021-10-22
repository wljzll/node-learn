// Buffer node中的16进制 电脑内存的标识全部用二进制来表示

// Buffer是node中提供的 老的用法 new Buffer

// new Buffer('a') // 这种用法不建议使用了
// (node:256) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues.
// Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
// (Use `node --trace-deprecation ...` to show where the warning was created)

// Buffer代表的是内存 如果一旦声明好,不能扩展(随意更改大小),如果想去更改buffer的大小,改小可以截取内存,改大的话需要创造一个大的内存空间,将数据拷贝过去

// 声明buffer的三种方式:

// 声明buffer的时候需要指定大小 npm install @types/node(这个包的作用仅仅是为了代码提示)
let buf1 = Buffer.alloc(3); // 最小的单位是 3个字节 最小单位就是字节
console.log(buf1); // <Buffer 00 00 00>

let buf2 = Buffer.from([0xff, 0xff, 0xff]); // 很少使用数组来定义buffer,因为要指定存放的内容, 放不识别的东西,就默认给 00
console.log(buf2);

// buffer的主要应用可以存储数据 数据可以全部用buffer表示出来 可以和字符串相互转化
let buf3 = Buffer.from("珠峰");
console.log(buf3); // <Buffer e7 8f a0 e5 b3 b0>

console.log(buf3.toString("utf-8")); // 珠峰
console.log(buf3.toString("base64")); // 54+g5bOw

let buf4 = Buffer.from([1]);
console.log(buf4); // <Buffer 01>

const fs = require("fs");
const path = require("path");

let r = fs.readFileSync(path.resolve(__dirname, "./note.md"));
console.log(r); // <Buffer 31> => 转成10进制是 49 => 49对应的ASCII就是1
// 当我们读取操作时不指定编码 全部都是buffer类型 单个字节对照的都是ASCII表

// 改小buffer
const buf5 = Buffer.from([1, 2, 3, 4]); // buf5中存的都是内存地址
const buf6 = buf5.slice(0, 1); // 这里截取的是1对应的内存
console.log(buf6); // <Buffer 01>
buf6[0] = 100;
console.log(buf5); // <Buffer 64 02 03 04>

// 增大buffer

// copy()原理
Buffer.prototype.copy = function (target, targetStart, sourceStart, sourceEnd) {
  for (let i = sourceStart; i < sourceEnd; i++) {
    target[targetStart++] = this[i];
  }
};

// concat()原理
Buffer.concat = function (bufferList, len) {
  if (len == undefined) {
    len = bufferList.reduce((a, b) => a + b.length, 0);
  }
  let bigBuffer = Buffer.alloc(len);
  let offset = 0;
  for (let i = 0; i < bufferList.length; i++) {
    let buf = bufferList[i];
    if (Buffer.isBuffer(buf)) {
      buf.copy(bigBuffer, offset);
      offset += buf.length;
    }
  }
};

const buf7 = Buffer.from("珠峰");
const buf8 = Buffer.from("架构");
// console.log(buf7.length); // 6 buffer的length指的是字节的长度

const bigBuf = Buffer.alloc(12);
// copy(bigBuf, 0, 0, 6) bigBuf: 目标buffer, 0: 目标buffer的开始位置, 0: 源buffer的开始位置, 6: 源buffer的结束位置
buf7.copy(bigBuf, 0, 0, 6);
buf8.copy(bigBuf, 6, 3, 6);
// console.log(bigBuf.toString());

console.log(Buffer.concat([buf7, buf8]).toString()); // 珠峰架构
console.log(Buffer.concat([buf7, buf8], 9).toString()); // 珠峰架 这个9代表新buffer的长度

// 类方法
// Buffer.alloc()
// Buffer.from()
// Buffer.concat()
// Buffer.isBuffer()

// 实例方法
// buffer.copy()
// buffer.toString([编码格式]) 将当前16进制buffer实例转成对应编码格式
// buffer.slice()
// buffer.length  buffer的字节长度