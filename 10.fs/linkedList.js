class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}

class LinkedList{
  constructor() {
      this.size = 0; // 链表的长度
      this.head = null; // 链表的头
  }
  _getNode(index) {
    let current = this.head;
    for (let i = 0; i< index; i++) { // 遍历 一直取元素的next 就取到了 index 对应的前一个元素
        current = current.next;
    }
    return current;
  }
  add(index, element) {
    if(arguments.length === 1) { // 只有一个参数 就是只传递了element
        element = index; // index代表的是元素
        index = this.size;
    }

    if(index == 0) { // 第一个元素
        let head = this.head; // this.head为null
        this.head = new Node(element, head); // 创建Node 当前head Node的next为空
    } else { 
       let prevNode = this._getNode(index - 1) // 获取要添加到的索引位置的前一个元素
       console.log(prevNode);
       prevNode.next = new Node(element, prevNode.next); // 创建新Node, 新Node的前一个元素是：prevNode, 后一个元素是prevNode.next.next

    }
    this.size ++; // 增加长度
  }
  get(index) {
      return this._getNode(index) 
  }
  // 修改Node
  update(index, element) {
    let node = this._getNode(index); // 要修改的Node
    node.element = element; // 修改
    return node; // 返回
  }
  // 移除对应索引的Node
  remove(index) {
      if(index === 0) { // 移除第一个
          this.head = this.head.next;
      } else { // 移除其他
          let prevNode = this._getNode(index - 1) // 获取要移除Node的前一个
          prevNode.next = prevNode.next.next // 要移除Node的前一个Node指向要移除的Node的后一个
      }
      this.size --; // 减少长度
  }
  reverse1() { // 递归反转
      function reverse(head) {
         if(head == null || head.next == null) return head // 链表的最后一个元素 返回
         let newHead = reverse(head.next) // 递归直到链表最后一个
         head.next.next = head // 链表的最后一个元素赋值为当前元素
         head.next = null // 当前元素的next置为null
         return newHead
      }

      this.head = reverse(this.head)
      return this.head
  }
  reverse2() { // 相当于创建一个新链表
    let head = this.head;
    if(head == null || head.next == null) return head; // 链表只有一项 不需要反转
    let newHead = null;
    while (head !=null ) {
        let temp = head.next; // 保存头元素以后的链表结构
        head.next = newHead; // 老的头的下一个指向空 意味着这个老的头变成了尾
        newHead = head; // 将老的头付给新头
        head = temp; // head被赋值了 保存的头以外的结构
    }
    this.head = newHead;
    return newHead;
  }
}

let ll = new LinkedList;
ll.add(1)
ll.add(2)
ll.add(3)
console.dir(ll, {
    depth : 1000
});

ll.reverse2()
console.dir(ll, {
    depth: 1000
});


