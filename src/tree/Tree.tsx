import React, {useEffect, useRef, useState} from "react";
import {AnimatedTree, KdTree, TreeNode} from '../model/bst';
import Node from "./Node";
import {BSTViewNodeProps, CursorNodePosition, Position} from "../model/types";
import {BehaviorSubject, zip} from "rxjs";
import {htmlCoordinateToSvgCoordinate, isIntersected} from "../model/utils";

const kdTree = KdTree();
const nodeTree = KdTree();

function Tree(props: {
    treeSubject: BehaviorSubject<CursorNodePosition>,
    cursorPosition: BehaviorSubject<Position>, closestNode: BehaviorSubject<Position>
}) {
    const svgContainer: any = useRef(null);
    let [rootNodes, setNodeArrays] = useState<TreeNode<any, any>[]>([]);
    let [currentClosest, setCurrentClosest] = useState<Position>();


    useEffect(() => {
        let nodeValueSubscription = props.treeSubject
            .subscribe(onNewRootNodeValueReceived());

        let closestToCursorSubscription = props.cursorPosition
            .subscribe(cursorPos => {
                let cursorRelativePoint = htmlCoordinateToSvgCoordinate(svgContainer.current, cursorPos.x, cursorPos.y);
                let closest = kdTree.closest({x: cursorRelativePoint.x, y: cursorRelativePoint.y});
                if (closest) {
                    setCurrentClosest({
                        x: closest.point.x,
                        y: closest.point.y,
                    });
                    props.closestNode.next(closest.point);
                }
            });
        return () => {
            nodeValueSubscription.unsubscribe();
            closestToCursorSubscription.unsubscribe();
        }
    }, []);

    const onNewRootNodeValueReceived = function () {
        let isHorizontal = false;

        return (next: CursorNodePosition) => {

            if (next.x && next.y && next.value) {
                let relativeSvgPoint = htmlCoordinateToSvgCoordinate(svgContainer.current, next.x, next.y);
                const newNode: TreeNode<any, any> = {
                    key: parseInt(next.value, 10), value: next.value, left: null, right: null,
                    viewProps: {
                        x: relativeSvgPoint.x,
                        y: relativeSvgPoint.y,
                    },
                    parent: null
                }


                kdTree.insert({x: relativeSvgPoint.x, y: relativeSvgPoint.y});
                setNodeArrays((prevState) => {
                    return [...prevState, newNode];
                });
                // kdTree.draw(svgContainer.current);
                // isHorizontal = !isHorizontal;
            }
        };
    }

    useEffect(() => {

        const subscription = zip(props.closestNode, props.treeSubject).subscribe(
            ([closest,cursorPos]) => {
                const interactiveArea: SVGElement = document.querySelector(".tree-area")!;
                console.log(cursorPos);
                console.log(cursorPos, isIntersected(closest, cursorPos, interactiveArea))
                if (closest.x === currentClosest?.x && closest.y === currentClosest.y && isIntersected(closest, cursorPos, interactiveArea)) {
                    let matchedRootNode = rootNodes.find(node => {
                        let nodePos = node.viewProps;
                        return nodePos?.x === closest.x && nodePos.y === closest.y;
                    });

                    console.log(cursorPos.value)
                    if (cursorPos.value) {
                        const animatedTree = AnimatedTree<number, any>();
                        if (matchedRootNode) {
                            matchedRootNode = animatedTree.insert(parseInt(cursorPos.value, 10), cursorPos.value, matchedRootNode);
                            rootNodes.splice(rootNodes.indexOf(matchedRootNode), 1);
                            const nodeArrays = animatedTree.getNodeArray(matchedRootNode || null);
                            console.log(nodeArrays);
                            setNodeArrays([...nodeArrays]);
                        }

                    }
                }
            }
        );
        return () => {
            subscription.unsubscribe();
        }
    }, [currentClosest, props.treeSubject.getValue()]);


    return (
        <svg className="tree-area" ref={svgContainer} width="100%" height="100%">
            {
                rootNodes.map((element: TreeNode<any, any>, index: any) => {

                    return (
                        <Node key={index} id={index} nodeProps={element} parentProps={element.parent}
                              container={svgContainer} currentClosest={currentClosest}
                              cursorPos={props.cursorPosition} closestNode={props.closestNode}/>
                    );

                })
            }
        </svg>
    );
}

export default Tree;








