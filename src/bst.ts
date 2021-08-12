
/**
 * @constructor
 * @this Tree
 */
export const Tree = function <K, V>(): void {

    this.root = null;

    const insert = (key: K, value: V): void => {
        this.root = insertNode(this.root, key, value);
    }

    const insertNode = (node: TreeNode<K, V> | null, key: K, value: V): TreeNode<K, V> | null => {
        if (node == null) {
            return { key: key, value: value, left: null, right: null }
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

    const deleteNode = (key: K): void => {
        if (this.root == null) {
            return;
        }
        this.root = deleteTreeNode(this.root, key);
    }


    let deleteTreeNode = (node: TreeNode<K, V>, key: K): TreeNode<K, V> | null => {
        if (node.key == key) {
            return null;
        }

        if (node.left && key < node.left.key) {
            node.left = deleteTreeNode(node.left, key);
        } else if (node.right && key > node.right.key) {
            node.right = deleteTreeNode(node.right, key);
        } else {
            const min = minNode(node.right!);
            const subRoot = delMin(node.right!);
            min.left = node.left;
            min.right = subRoot.right;
            return min;
        }
        return null;
    }

    let minNode = (node: TreeNode<K, V>): TreeNode<K, V> => {
        if (node.left == null) {
            return node
        }
        return minNode(node.left);
    }

    let delMin = (node: TreeNode<K, V>): TreeNode<K, V> => {
        if (node.left == null) {
            return node;
        } else if (node.left.left == null) {
            let nodeToReturn = node.left;
            node.key = nodeToReturn.key;
            node.left = null;
            return nodeToReturn;
        }
        return delMin(node.left);
    }



    interface TreeNode<K, V> {
        key: K,
        value: V
        left: TreeNode<K, V> | null,
        right: TreeNode<K, V> | null,
    };
    Tree.prototype.insert = insert;
    Tree.prototype.deleteNode = deleteNode;
}


