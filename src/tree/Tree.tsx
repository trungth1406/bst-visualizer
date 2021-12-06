import React, {useEffect, useRef, useState} from "react";
import {KdTree, TreeNode} from '../model/bst';
import Node from "./Node";
import {CursorNodePosition, ViewNodeProps} from "../model/types";
import {BehaviorSubject, last, take, takeWhile} from "rxjs";

const kdTree = KdTree();

function Tree(props: { treeSubject: BehaviorSubject<CursorNodePosition> }) {
    const nodeContainer: any = useRef(null);
    let [rootNodes, setNodeArrays] = useState<ViewNodeProps[]>([]);


    useEffect(() => {
        console.log("First time")
        props.treeSubject
            .subscribe(onNewRootNodeValueReceived())
    }, []);


    const onNewRootNodeValueReceived = function () {
        return (next: CursorNodePosition) => {
            if (next.x && next.y) {
                const newNode: TreeNode<any, any> = {
                    key: next.value, value: next.value, left: null, right: null,

                }
                kdTree.insert({x: next.x, y: next.y})
                // Add new node to rootNodes array
                let boundingClientRect = nodeContainer.current.getBoundingClientRect();
                setNodeArrays((prevState) => {
                    return [...prevState, generateViewNode(newNode, next, boundingClientRect)]
                });
                console.log(kdTree.getRoot());
            }
        };
    }

    const generateViewNode = function (node: TreeNode<any, any>, pos: CursorNodePosition, treeContainer: any): ViewNodeProps {
        return {
            node: node,
            parentNode: null,
            boundingRect: treeContainer,
            viewProps: {
                position: {
                    x: pos.x, y: pos.y
                }
            }
        }
    }


    return (
        <svg className="tree-area" ref={nodeContainer} width="100%" height="100%">
            {
                rootNodes.map((element: any, index: any) => {
                    return <Node key={index} id={index} nodeProps={element} parentProps={element.parentNode}
                                 container={nodeContainer}/>;
                })
            }
        </svg>
    );
}

export default Tree;








