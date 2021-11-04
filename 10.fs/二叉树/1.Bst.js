class Node {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    }

    let currentNode = this.root; // 当前要对比元素
    let compare = null; // 对比结果
    let parent = null; // 父元素
    while (currentNode) {
      compare = element - currentNode.element;
      parent = currentNode; // 最终存放的是element的子元素
      if (compare > 0) { // 右边
        currentNode = currentNode.right;
      } else if (compare < 0) { // 左边
        currentNode = currentNode.left;
      }
    }

    let newNode = new Node(element, parent);
    if (compare > 0) {
        parent.right = newNode;
    } else {
        parent.left = newNode;
    }
    this.size++;
  }
}

let bst = new BST();
let arr = [10, 8, 19, 6, 15, 22];
arr.forEach((item) => {
  bst.add(item);
});
console.dir(bst.root, {
    depth: 100
});
