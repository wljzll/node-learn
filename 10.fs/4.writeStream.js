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

    this.len = 0;
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
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destroy();
      }
      this.fd = fd;
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
  write(chunk, encoding = null, cb = () => {}) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;
    this.needDrain = this.len >= this.highWaterMark;

    let oldCb = cb;

    cb = () => {
      oldCb();
      this.clearBuffer();
    };

    if (this.writing) {
      this.cache.push({
        chunk,
        encoding,
        cb,
      });
    } else {
      this.writing = true;
      this._write(chunk, encoding, cb);
    }

    return !this.needDrain;
  }
  _write(chunk, encoding, cb) {
    if (typeof this.fd !== "number") {
      return this.once("open", () => this._write(chunk, encoding, cb));
    }

    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.offset += written;
      this.len -= written;
      cb();
    });
  }
  end(chunk, encoding = null, cb = () => {}) {}
}
module.exports = WriteStream;
