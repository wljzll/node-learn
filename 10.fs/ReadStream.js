const EventEmitter = require("events");
const fs = require("fs");
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    this.emitClose = options.emitClose || true;
    this.start = options.start || 0;
    this.end = options.end || undefined;
    this.highWaterMark = options.highWaterMark || 64 * 1024;

    this.flowing = false; // 非流动模式 控制读取开始暂停
    this.offset = this.start;
    this.open(); // 开启文件 这是个异步方法

    // 每次调用on方法注册事件 如果不是newListener事件就会触发newListener的回调 同步触发
    this.on("newListener", (type) => {
      if (type === "data") {
        this.flowing = true;
        this.read();
      }
    });
  }
  destroy(err) {
    if (err) {
      this.emit("error", err);
    }
    if (this.autoClose) {
      fs.close(this.fd, () => {
        if (this.emitClose) {
          this.emit("close");
        }
      });
    }
  }
  // fs.open()打开文件
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destroy();
      }
      this.fd = fd;
      this.emit("open", fd); // 当emit open事件时 说明有fd了
    });
  }
  // fs.read()读取文件
  read() {
    if (typeof this.fd !== "number") {
      return this.once("open", () => this.read());
    }
    // 需要根据用户提供的 start 和 end 来进行读取 计算每次读取的长度 只有当最后一次读取的长度小于 highWaterMark时,才会用到计算出的长度
    let howMuchToRead = this.end
      ? Math.min(this.highWaterMark, this.end - this.offset + 1)
      : this.highWaterMark;
    const buffer = Buffer.alloc(howMuchToRead);
    fs.read(
      this.fd,
      buffer,
      0,
      howMuchToRead,
      this.offset,
      (err, bytesRead) => {
        if (bytesRead) {
          this.offset += bytesRead;
          this.emit("data", buffer);
          if (this.flowing) {
            this.read();
          }
        } else {
          this.emit("end");
          this.destroy();
        }
      }
    );
  }
  pause() {
    this.flowing = false;
  }
  resume() {
    if (!this.flowing) {
      this.flowing = true;
      this.read();
    }
  }
}
module.exports = ReadStream;
