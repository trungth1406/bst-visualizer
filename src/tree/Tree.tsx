import React, {useEffect, useRef, useState} from "react";
import {KdTree, TreeNode} from '../model/bst';
import Node from "./Node";
import {CursorNodePosition, Position, ViewNodeProps} from "../model/types";
import {BehaviorSubject, last, take, takeWhile} from "rxjs";
import {generateSvgPoint} from "../model/utils";

const kdTree = KdTree();

function Tree(props: { treeSubject: BehaviorSubject<CursorNodePosition>, cursorPosition: BehaviorSubject<Position> }) {
    const nodeContainer: any = useRef(null);
    let [rootNodes, setNodeArrays] = useState<ViewNodeProps[]>([]);
    let [currentClosest, setCurrentClosest] = useState<Position>();


    useEffect(() => {
        props.treeSubject
            .subscribe(onNewRootNodeValueReceived())
        props.cursorPosition
            .subscribe(value => {
                let cursorRelativePoint = generateSvgPoint(nodeContainer.current, nodeContainer.current, value.x, value.y);
                let closest = kdTree.closest({x: cursorRelativePoint.x, y: cursorRelativePoint.y});
                if (closest) {
                    setCurrentClosest({
                        x: closest.point.x,
                        y: closest.point.y,
                    });
                }
            })
    }, []);


    const onNewRootNodeValueReceived = function () {
        let isHorizontal = false;
        return (next: CursorNodePosition) => {
            if (next.x && next.y) {
                let boundingClientRect = nodeContainer.current.getBoundingClientRect();
                const newNode: TreeNode<any, any> = {
                    key: next.value, value: next.value, left: null, right: null,

                }
                let relativeSvgPoint = generateSvgPoint(nodeContainer.current, nodeContainer.current, next.x, next.y);
                kdTree.insert({x: relativeSvgPoint.x, y: relativeSvgPoint.y});

                setNodeArrays((prevState) => {
                    return [...prevState, generateViewNode(newNode, {
                        value: newNode.value,
                        x: relativeSvgPoint.x,
                        y: relativeSvgPoint.y
                    }, boundingClientRect)]
                });

                // kdTree.draw(nodeContainer.current);
                isHorizontal = !isHorizontal;
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
                                 container={nodeContainer} currentClosest={currentClosest}/>;
                })
            }
        </svg>
    );
}

export default Tree;








