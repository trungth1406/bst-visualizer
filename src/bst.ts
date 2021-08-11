

export const Tree = <K, V>() => {

    let root: TreeNode<K, V> | null = null;

    const insert = (key: K, value: V) => {
        root = insertNode(root, key, value);
    }

    const insertNode = (node: TreeNode<K, V> | null, key: K, value: V): TreeNode<K, V> | null => {
        if (node == null) {
            return { key: key, value: value, left: null, right: null }
        }

        if (key < node.key) {
            node = insertNode(node.left, key, value);
        } else if (key > node.key) {
            node = insertNode(node.right, key, value);
        } else {
            node.value = value;
        }
        return node;
    }

    const deleteNode = (key: K): void => {
        if (root == null) {
            return;
        }
        root = deleteTreeNode(root, key);
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


        }
        return null;
    }

    let minNode = (node: TreeNode<K, V>): TreeNode<K, V> => {
        if (node.left == null) {
            return node
        }
        return minNode(node.left);
    }



    interface TreeNode<K, V> {
        key: K,
        value: V
        left: TreeNode<K, V> | null,
        right: TreeNode<K, V> | null,
    };


    return {
        root: root,
        insert: insert,
        delete: deleteNode
    }
}

