// tell me a joke


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
                                 point: Point, isHorizontalCompare: boolean, isLeftOrBottom: boolean): KdTreeNode<Point, any> | null {

        // If the tree is empty and  parent is null, then this is the root node with Rectangle(0, 0, 1, 1)
        if (currentNode == null) {
            let rect: Rectangle2D | null;
            if (parentNode == null) {
                rect = Rectangle(0, 0, 1, 1);
            } else {

                if (isHorizontalCompare) {
                    // isLeft
                    if (isLeftOrBottom) {
                        rect = Rectangle(parentNode.containingRect.xMin, parentNode.containingRect.yMin, parentNode.point.x, parentNode.containingRect.yMax);
                    } else {
                        rect = Rectangle(parentNode.point.x, parentNode.containingRect.yMin, parentNode.containingRect.xMax, parentNode.containingRect.yMax);
                    }
                } else {
                    if (isLeftOrBottom) {
                        rect = Rectangle(parentNode.containingRect.xMin, parentNode.containingRect.yMin, parentNode.containingRect.xMax, parentNode.point.y);
                    } else {
                        rect = Rectangle(parentNode.containingRect.xMin, parentNode.point.y, parentNode.containingRect.xMax, parentNode.containingRect.yMax);
                    }
                }

            }

            return {
                point: point,
                left: null,
                right: null,
                containingRect: rect
            }

        }

        if (isHorizontalCompare) {
            if (point.y > currentNode.point.y) {
                currentNode.left = insertNode(currentNode.left, currentNode, point, false, true);
            } else {
                currentNode.right = insertNode(currentNode.right, currentNode, point, false, false);
            }
        } else {
            if (point.x < currentNode.point.x) {
                currentNode.left = insertNode(currentNode.left, currentNode, point, true, true);
            } else {
                currentNode.right = insertNode(currentNode.right, currentNode, point, true, false);
            }
        }

        return currentNode;
    }

    const closest = function (point: Point): KdTreeNode<Point, any> | null {
        return closestNode(root, root, point, false, false);
    }

    const closestNode = function (currentNode: KdTreeNode<Point, any> | null, currentClosest: KdTreeNode<Point, any> | null,
                                  point: Point, isHorizontalCompare: boolean, isLeftOrBottom: boolean): KdTreeNode<Point, any> | null {
        if (currentNode == null) {
            return currentClosest;
        }
        const currentClosestPoint = Point2D(currentClosest?.point.x! , currentClosest?.point.y!);
        const currentNodePoint = Point2D(currentNode?.point.x! , currentNode?.point.y!);
        const point2D = Point2D(point.x, point.y);
        if(currentNodePoint.distanceTo(point2D) < currentClosestPoint.distanceTo(point2D)) {
            currentClosest = currentNode;
        }


        if (isHorizontalCompare) {
            if (point.x < currentNode.point.x) {
                return closestNode(currentNode.left, currentClosest, point, false, true);
            } else {
                return closestNode(currentNode.right, currentClosest, point, false, false);
            }
        } else {
            if (point.y < currentNode.point.y) {
                return closestNode(currentNode.left, currentClosest, point, true, true);
            } else {
                return closestNode(currentNode.right, currentClosest, point, true, false);
            }
        }
    }


    const draw = function (svg: SVGSVGElement) {
        if (root == null) {
            return;
        }
        drawNodeLine(svg, root, false);
    }

    const drawNodeLine = function (svg: SVGSVGElement, currentNode: KdTreeNode<Point, any>, isHorizontalCompare: boolean) {
        drawSvgLine(svg, currentNode, isHorizontalCompare);

        if (isHorizontalCompare) {
            if (currentNode.left) {
                drawNodeLine(svg, currentNode.left, false);
            }
            if (currentNode.right) {
                drawNodeLine(svg, currentNode.right, false);

            }
        } else {
            if (currentNode.left) {
                drawNodeLine(svg, currentNode.left, true);
            }
            if (currentNode.right) {
                drawNodeLine(svg, currentNode.right, true);
            }

        }
    }


    const drawSvgLine = function (svg: SVGSVGElement, treeNode: KdTreeNode<Point, any>, isHorizontalCompare: boolean) {
        let color = isHorizontalCompare ? "red" : "blue";
        const centerPoint = Point2D(treeNode.point.x, treeNode.point.y);
        if (isHorizontalCompare) {
            centerPoint.drawTo(svg, {x: treeNode.containingRect.xMin!, y: centerPoint.y}, color);
            centerPoint.drawTo(svg, {
                x: treeNode.containingRect.xMax! === 1 ? svg.width.baseVal.value : treeNode.containingRect.xMax!,
                y: centerPoint.y
            }, color);
        } else {
            centerPoint.drawTo(svg, {x: centerPoint.x, y: treeNode.containingRect.yMax!}, color);
            centerPoint.drawTo(svg, {
                x: centerPoint.x,
                y: treeNode.containingRect.yMin! === 0 ? svg.height.baseVal.value : treeNode.containingRect.yMin!
            }, color);
        }
    }


    return {
        getRoot: () => {
            return root
        },
        insert: insert,
        draw: draw,
        closest: closest
    }


}


export interface TreeNode<K, V> {
    key: K,
    value: V
    left: TreeNode<K, V> | null,
    right: TreeNode<K, V> | null,
}

export interface KdTreeNode<K, V> {
    containingRect: Rectangle2D,
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
