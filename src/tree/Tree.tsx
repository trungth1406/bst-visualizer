import React, {useEffect, useRef, useState} from "react";
import {TreeNode} from '../model/bst';
import Node from "./Node";
import {CursorNodePosition, ViewNodeProps} from "../model/types";
import {BehaviorSubject, last, take, takeWhile} from "rxjs";


function Tree(props: { treeSubject: BehaviorSubject<CursorNodePosition> }) {
    const nodeContainer: any = useRef(null);
    let [rootNodes, setNodeArrays] = useState<ViewNodeProps[]>([]);

    useEffect(() => {
        props.treeSubject
            .pipe()
            .subscribe(onNewRootNodeValueReceived())
    }, [ ]);

    const onNewRootNodeValueReceived =  function() {
        return (next : CursorNodePosition) => {
            if (next.x && next.y) {
                const newNode: TreeNode<any,any> = {
                    key: next.value, value: next.value,  left: null, right: null,

                }
                let boundingClientRect = nodeContainer.current.getBoundingClientRect();
                rootNodes.push(generateViewNode(newNode, next,boundingClientRect))
                setNodeArrays([...rootNodes]);
            }
        };
    }

    const generateViewNode = function (node: TreeNode<any, any>, pos : CursorNodePosition,  treeContainer: any): ViewNodeProps {
        return {
            node: node,
            parentNode: null,
            boundingRect: treeContainer,
            viewProps: {
                position: {
                    x:pos.x, y: pos.y
                }
            }
        }
    }


    return (
        <svg className="tree-area" ref={nodeContainer} width="100%" height="100%">
            {
                rootNodes.map((element: any, index: any) => {
                    return <Node id={index} nodeProps={element} parentProps={element.parentNode}
                                 container={nodeContainer}/>;
                })
            }
        </svg>
    );
}

export default Tree;








