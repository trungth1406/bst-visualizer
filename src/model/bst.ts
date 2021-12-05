/**
 * @constructor
 * @this Tree
 */

const Tree = function <K, V>(): any {

    this.insert = function (key: K, value: V): void {
        this.root = this.insertNode(this.root, key, value);
    }

    this.deleteNode = function (key: K): void {
        if (this.root == null) {
            return;
        }
        this.root = this.deleteTreeNode(this.root, key);
    }

    this.getRoot = function (): TreeNode<K, V> {
        return this.root;
    }
}


Tree.prototype.insertNode = function insertNode<K, V>(node: TreeNode<K, V> | null, key: K, value: V): TreeNode<K, V> | null {
    if (node == null) {
        return {key: key, value: value, left: null, right: null}
    }

    if (key < node.key) {
        node.left = insertNode(node.left, key, value);
    } else if (key > node.key) {
        node.right = insertNode(node.right, key, value);
    } else {
        node.value = value;
    }
    return node;
}


Tree.prototype.deleteTreeNode = function deleteTreeNode<K, V>(node: TreeNode<K, V>, key: K): TreeNode<K, V> | null {
    if (!node) {
        return null;
    }

    if (node.left && key < node.left.key) {
        node.left = deleteTreeNode(node.left, key);
    } else if (node.right && key > node.right.key) {
        node.right = deleteTreeNode(node.right, key);
    } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let tmpRef = node;
        node = this.minNode(tmpRef.right);
        node.right = this.delMin(tmpRef.right)
        node.left = tmpRef.left;
    }
    return node;
}


Tree.prototype.minNode = function minNode<K, V>(node: TreeNode<K, V>): TreeNode<K, V> {
    if (node.left == null) {
        return node
    }
    return minNode(node.left);
}

Tree.prototype.delMin = function delMin<K, V>(node: TreeNode<K, V>): TreeNode<K, V> | null {
    if (node.left == null) {
        return node.right;
    }
    node.left = delMin(node.left);
    return node;
}


const BinarySearchTree = function <K, V>(): BinarySearchTreeModel<K, V> {
    // @ts-ignore
    return new Tree<K, V>();
}


export const KdTree = function (): void {

}


KdTree.bind(Tree.prototype);


export interface TreeNode<K, V> {
    key: K,
    value: V
    left: TreeNode<K, V> | null,
    right: TreeNode<K, V> | null,
}

interface BinarySearchTreeModel<K, V> {
    getRoot: () => TreeNode<K, V> | null
    insert: (key: K, value: V) => void
    deleteNode: (key: K) => void
}

export { BinarySearchTree }