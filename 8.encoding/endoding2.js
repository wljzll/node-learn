// 编码史: ASCII => GBK18030/gbk => unicode => utf-8

// base64的作用: 1.开发中能替换掉路径;2.而且可以用于传输;3.不是加密;
// 缺点: 1.使用base64转换结果会比原文件大1/3

// 1个汉字三个字节,一个字节八个位 3*8=24位
let r = Buffer.from('珠')
console.log(r); // e7 8f a0 Buffer是十六进制的
console.log((0xe7).toString(2)); // 11100111
console.log((0x8f).toString(2)); // 10001111
console.log((0xa0).toString(2)); // 10100000

111001111000111110100000 // 原二进制的 珠
// 用base64编码:编码后的最大数: 00111111 = 63  最小数00000000 = 0 所以编码后的二进制转十进制范围在 0-63之间,共64个数
// 111001 111000 111110 100000
// 00111001 00111000 00111110 00100000 // 将原3*8的3个字节,切割成 4 * 6 然后补零的四个字节, 这就是base64名字的来源

// 再将编码后的二进制转成十进制
console.log(parseInt('00111001', 2)); // 57
console.log(parseInt('00111000', 2)); // 56
console.log(parseInt('00111110', 2)); // 62
console.log(parseInt('00100000', 2)); // 32

// base64的映射表
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
str += str.toLowerCase()
str += '0123456789+/'
console.log(str); // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/

console.log(str[57]); // 5
console.log(str[56]); // 4
console.log(str[62]); // + 
console.log(str[32]); // g
// 所以珠对应的base64就是 54+g