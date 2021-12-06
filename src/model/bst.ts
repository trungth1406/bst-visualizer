/**
 * @constructor
 * @this Tree
 */

import {Point, Point2D, Rectangle, Rectangle2D} from "./point";


const Tree = function <K, V>(): any {

    this.root = null;

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


export const KdTree = function () {
    let root: KdTreeNode<Point, any> | null;

    const insert = function (point: Point) {
        root = insertNode(root, null, point, false, false);
    }

    const insertNode = function (currentNode: KdTreeNode<Point, any> | null,
                                 parentNode: KdTreeNode<Point, any> | null,
                                 point: Point, isHorizontal: boolean, isLeftOrDown: boolean): KdTreeNode<Point, any> | null {
        // @ts-ignore
        const point2D = new Point2D(point.x, point.y);
        if (currentNode == null) {
            let rectHv;
            if (!parentNode) {
                rectHv = Rectangle(0, 0, 1, 1);
            } else if (isHorizontal) {
                const parentNodeRect = parentNode.rect;
                const parentPoint = parentNode.point;
                if (isLeftOrDown) {
                    rectHv = Rectangle(
                        parentNodeRect?.xMin, parentNodeRect?.yMin,
                        parentPoint.x, parentNodeRect?.yMax
                    );
                } else {
                    rectHv = Rectangle(
                        parentPoint?.x, parentNodeRect?.yMin,
                        parentNodeRect?.xMax, parentNodeRect?.yMax
                    );
                }

            } else {
                const parentNodeRect = parentNode.rect;
                const parentPoint = parentNode.point;
                if (isLeftOrDown) {
                    rectHv = Rectangle(
                        parentNodeRect?.xMin, parentNodeRect?.yMin,
                        parentNodeRect?.xMax, parentPoint?.y
                    );
                } else {
                    rectHv = Rectangle(
                        parentPoint?.x, parentPoint?.y,
                        parentNodeRect?.xMax, parentNodeRect?.yMax
                    );
                }

            }
            return {
                point: point,
                rect: rectHv,
                left: null,
                right: null
            }
        }

        if (isHorizontal) {
            if (point.y < currentNode.point.y) {
                currentNode.left = insertNode(currentNode.left, parentNode, point, false, true);
            } else {
                currentNode.right = insertNode(currentNode.right, parentNode, point, false, false);
            }
        } else {
            if (point.x < currentNode.point.x) {
                currentNode.left = insertNode(currentNode.left, parentNode, point, true, true);
            } else {
                currentNode.right = insertNode(currentNode.right, parentNode, point, true, false);
            }
        }
        return currentNode;
    }


    return {
        getRoot: () => {
            return root
        },
        insert: insert,
    }


}


export interface TreeNode<K, V> {
    key: K,
    value: V
    left: TreeNode<K, V> | null,
    right: TreeNode<K, V> | null,
}

export interface KdTreeNode<K, V> {
    rect: Rectangle2D | null,
    point: Point,
    left: KdTreeNode<K, V> | null,
    right: KdTreeNode<K, V> | null,
}


interface BinarySearchTreeModel<K, V> {
    getRoot: () => TreeNode<K, V> | null
    insert: (key: K, value: V) => void
    deleteNode: (key: K) => void
}

export {BinarySearchTree};