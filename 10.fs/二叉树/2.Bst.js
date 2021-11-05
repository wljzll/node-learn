// 前序遍历Preorder Traversal(先访问根节点、前序遍历左子树、前序遍历右子树)

// 中序遍历 Inorder Traversal(中序遍历左子树、根节点、中序遍历右子树)

// 后续遍历 Postorder Traversal(后序遍历左子树、后续遍历右子树、根节点)

// 层序遍历 Level Order Traversal (从上到下，从左到右依次访问每一个节点)
class Node {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(compare) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }
  // 比对要添加元素和当前根元素的大小
  compare(e1, e2) {
    return e1 - e2;
  }
  // 添加元素
  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    }

    let currentNode = this.root; // 当前要对比元素
    let compare = null; // 对比结果
    let parent = null; // 当前的父元素
    while (currentNode) {
      // 循环找最终要放到其后面的元素
      compare = this.compare(element, currentNode.element);
      parent = currentNode; // 最终存放的是element的子元素
      if (compare > 0) {
        // 右边
        currentNode = currentNode.right;
      } else if (compare < 0) {
        // 左边
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
  // 前序遍历
  preOrderTraversal(cb = () => {}) {
    const traversal = (node) => {
      if (node === null) return;
      cb(node);
      traversal(node.left);
      traversal(node.right);
    };

    traversal(this.root);
  }
  // 中序遍历
  inOrderTraversal(cb = () => {}) {
    const traversal = (node) => {
      if (node === null) return;
      traversal(node.left);
      cb(node);
      traversal(node.right);
    };

    traversal(this.root);
  }
  // 后序遍历
  postOrderTraversal(cb = () => {}) {
    const traversal = (node) => {
      if (node === null) return;
      traversal(node.left);
      traversal(node.right);
      cb(node);
    };

    traversal(this.root);
  }
  // 层序遍历
  levelOrderTraversal(cb = () => {}) {
    let stack = [this.root];
    let currentNode = null;
    let index = 0;
    while ((currentNode = stack[index++])) {
      cb(currentNode);
      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
  }
  // 反转
  invertTree(){
    if (this.root == null) return;
    let stack = [this.root];
    let currentNode = null;
    let index = 0;
    while (currentNode = stack[index++]) {
        let tmp = currentNode.left;
        currentNode.left = currentNode.right;
        currentNode.right = tmp
        if (currentNode.left) {
            stack.push(currentNode.left);
        }
        if (currentNode.right) {
            stack.push(currentNode.right);
        }
    }
    return this.root;
}
}

let bst = new BST((e1, e2) => {
  return e1.age - e2.age;
});
let arr = [
  { age: 10 },
  { age: 8 },
  { age: 19 },
  { age: 6 },
  { age: 15 },
  { age: 22 },
];
arr.forEach((item) => {
  bst.add(item);
});
// console.dir(bst.root, {
//   depth: 100
// });

bst.levelOrderTraversal((node) => {
  console.log(node.element);
});
