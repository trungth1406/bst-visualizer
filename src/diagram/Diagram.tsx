import React, {useState} from "react";
import Tree from "../tree/Tree";
import NodeCursor from "../tree/NodeCursor";
import {BehaviorSubject} from "rxjs";
import {CursorNodePosition, Position} from "../model/types";
import {TreeNode} from "../model/bst";


function Diagram() {
    const treeSubject = new BehaviorSubject<CursorNodePosition>({
        x: 0,
        y: 0,
        value: ''
    });

    return (
        <div className="diagram-container">
            <Tree treeSubject = {treeSubject} />
            <NodeCursor treeSubject={treeSubject}/>
        </div>)
}

export default Diagram