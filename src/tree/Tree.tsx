import { Stage } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { BasicBinarySearchTree, TreeNode } from "./bst";
import Node from "./Node";
import { Dimension, Position, ViewNodeProps } from "./types";

let tree = BasicBinarySearchTree<String, Number>().newInstance();

function Tree() {

    tree.insert(10, "A");
    tree.insert(16, "A");
    // tree.insert(9, "A");
    // tree.insert(17, "A");
    // tree.insert(15, "A");
    // tree.insert(19, "A");
    // tree.insert(116, "A");
    // tree.insert(18, "A");
    const nodeContainer: any = useRef(null);
    const rootNode = tree.getRoot();
    const treeNodes: ViewNodeProps[] = [];
    let rectSize = useRectSize({
        width: undefined,
        height: undefined
    }, nodeContainer.current);

    let [nodes, setNodeArrays]: any = useState([]);

    useEffect(() => {
        drawNode(rootNode, null, rectSize, false);
        setNodeArrays([...treeNodes]);
    }, [nodeContainer, rootNode, rectSize]);

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

    return (
        <div ref={nodeContainer} className="w-full" style={{ position: "relative" }}>

            {
                nodes.map((element: any, index: any) => {
                    return <Node id={index} nodeProps={element} parentProps={nodes[index - 1]} container={nodeContainer} />;
                })
            }

        </div>
    );
}

export default Tree;



function generateViewNode(node: TreeNode<any, any>, parentNode: ViewNodeProps | null, rectSize: any, isLeft: boolean): ViewNodeProps {
    if (!parentNode) {
        return {
            node: node,
            parentNode: null,
            boundingRect: rectSize,
            viewProps: {
                position: {
                    x: rectSize.width / 2,
                    y: 10
                }
            }
        }
    }
    let parentPos = parentNode.viewProps.position


    // let A: Position = { x: parentPos.x - 32, y: parentPos.y }
    // let B: Position = { x: parentPos.x, y: parentPos.y + (2 * 32) }
    let C: Position = {
        x: isLeft ? parentPos.x - 96 : parentPos.x + 96,
        y: parentPos.y + (96)
    }
    console.log(C);

    return {
        node: node,
        parentNode: parentNode,
        boundingRect: rectSize,
        viewProps: {
            position: {
                x: C.x, y: C.y
            }
        }
    }
}


function useRectSize(initialValue: Dimension, rectRef: any) {
    let [rectSize, setrectSize] = useState<Dimension>(initialValue);
    useEffect(() => {
        function handleResize() {
            if (rectRef) {
                let { width, height, left } = rectRef.getBoundingClientRect();
                setrectSize({
                    width: width - left,
                    height: height,
                });
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [rectRef]);
    return rectSize;
}


