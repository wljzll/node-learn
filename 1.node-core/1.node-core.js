// node的应用场景

// 1、工具类： gulp webpack vite等(node 可以让js运行在服务器环境 runtime运行时) 让后端可以解析js语法，非常适合做前端工具链
// JS由三部分组成： BOM DOM ECMAScript  node中只有ECMAScript，没有BOM和DOM的概念

// 2、node还可以做服务端 node中新增了很多内容：http fs util

// 3、中间层(能够解决前后端跨域问题，前端可以格式化Java服务器返回数据返回供自己使用)


// node的特点：非阻塞  异步I/O 事件驱动(类似发布订阅)

// 非阻塞

// 异步I/O: 当前这个方法调用完毕后不会立即返回给我结果， 阻塞和非阻塞取决于调用方，调用方调用的是同步还是异步方法，一般都是两种：异步非阻塞，同步阻塞

// 事件驱动

// Java做服务端的优缺点
// 优点：多线程可以利用多核CPU，可以处理复杂的CPU密集型任务
// 缺点：不能处理高并发维妮塔，多线程 锁 切换时间片的问题

// Node做服务端的优缺点
// 优点：node支持多进程 可以开n个子进程
// 缺点：单线程 不适合做CPU密集型的任务 我们的web的瓶颈在于 多数都是文件读写 适合I/O密集型的