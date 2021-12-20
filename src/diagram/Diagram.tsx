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

    const cursorPosition = new BehaviorSubject<Position>({
        x: 0,
        y: 0
    });

    return (
        <div className="diagram-container">
            <Tree treeSubject={treeSubject} cursorPosition={cursorPosition}/>
            <NodeCursor treeSubject={treeSubject} cursorPosition={cursorPosition}/>
        </div>)
}

export default Diagram
