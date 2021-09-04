import { Stage } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { BasicBinarySearchTree, TreeNode } from "./bst";
import Node from "./Node";
import { Dimension, Position, ViewNodeProps } from "./types";
import { generateSvgPoint } from "./utils";

let tree = BasicBinarySearchTree<String, Number>().newInstance();

function Tree() {

    tree.insert(10, "A");
    tree.insert(16, "A");
    tree.insert(9, "A");

    const nodeContainer: any = useRef(null);
    const rootNode = tree.getRoot();
    const treeNodes: ViewNodeProps[] = [];


    let [nodes, setNodeArrays]: any = useState([]);

    useEffect(() => {
        let boundingRect = nodeContainer.current.getBoundingClientRect();
        drawNode(rootNode, null, boundingRect, false);
        setNodeArrays([...treeNodes]);
    }, [nodeContainer, rootNode]);



    const drawNode = function (node: TreeNode<any, any> | null, parentNode: ViewNodeProps | null, currentRect: any
        , isLeft: boolean) {
        if (node == null) {
            return;
        }
        let currentNode = generateViewNode(node, parentNode, currentRect, isLeft);
        treeNodes.push(currentNode);
        if (node.left) {
            drawNode(node.left, currentNode, currentRect, true);
        }
        if (node.right) {
            drawNode(node.right, currentNode, currentRect, false);
        }
    }

    const generateViewNode = function generateViewNode(
        node: TreeNode<any, any>, parentNode: ViewNodeProps | null,
        treeContainer: any, isLeft: boolean): ViewNodeProps {
        const getX = function (ratioToItsParent: number): number {
            if (!parentNode) {
                return (treeContainer.left + treeContainer.width + ratioToItsParent) / 2;
            }
            let parentPosition = parentNode.viewProps.position;
            return isLeft ? parentPosition.x - ratioToItsParent : parentPosition.x + ratioToItsParent
        }

        const getY = function (ratioToItsParent: number): number {
            if (!parentNode) {
                return 100;
            }
            let parentPosition = parentNode?.viewProps.position;
            return parentPosition!.y + (ratioToItsParent)
        }
        return {
            node: node,
            parentNode: parentNode,
            boundingRect: treeContainer,
            viewProps: {
                position: {
                    x: getX(96), y: getY(96)
                }
            }
        }
    }

    return (
        <svg ref={nodeContainer} width="100%" height="100%" viewBox="0 0 100% 100%" >
            {
                nodes.map((element: any, index: any) => {
                    return <Node id={index} nodeProps={element} parentProps={element.parentNode} container={nodeContainer} />;
                })
            }
        </svg>
    );
}

export default Tree;








