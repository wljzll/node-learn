const EventEmitter = require("events");
const fs = require("fs");
class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "w";
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    this.emitClose = options.emitClose || true;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024;

    this.len = 0; // 
    this.offset = this.start; // 写入的偏移量

    this.open(); // 开启文件 这是个异步方法
    this.cache = []; // 缓存写入操作
    this.needDrain = false; // 是否需要触发drain事件
    this.writing = false; // 是否正在写入
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
    // 打开文件
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) { // 如果打开失败 emit('error')
        return this.destroy(err);
      }
      // 打开成功 获取文件描述符fd
      this.fd = fd;
      // 触发open事件
      this.emit("open", fd); // 当emit open事件时 说明有fd了
    });
  }
  clearBuffer() {
    // 写入完毕后 清空缓存区
    let obj = this.cache.shift();
    if (obj) {
      this._write(obj.chunk, obj.encoding, obj.cb);
    } else {
      this.writing = false;
      if (this.needDrain) {
        this.needDrain = false;
        this.emit("drain");
      }
    }
  }

  // 用户调用write()方法
  write(chunk, encoding = null, cb = () => {}) {
    // 传入的不是buffer转成buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length; // 要写入的字节长度
    this.needDrain = this.len >= this.highWaterMark; // 判断写入的字节长度 和 上限字节长度比对 判断这次写入完成是否需要drain
    
    // 函数劫持
    let oldCb = cb;
    cb = () => {
      oldCb();
      this.clearBuffer();
    };
    
    // 如果正在写入 将这次写入操作加入缓存区
    if (this.writing) {
      this.cache.push({
        chunk,
        encoding,
        cb,
      });
    } else { // 否则直接写入
      this.writing = true;
      this._write(chunk, encoding, cb);
    }

    return !this.needDrain;
  }
  _write(chunk, encoding, cb) { // 用户执行此方法时 可能open()方法还未执行完 未拿到 fd 文件描述符
    if (typeof this.fd !== "number") {
      return this.once("open", () => this._write(chunk, encoding, cb));
    }

    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.offset += written; // 更新偏移量
      this.len -= written; // 更新正在写入的字节长度
      cb();
    });
  }
  end(chunk, encoding = null, cb = () => {}) {}
}
module.exports = WriteStream;
