import React, {useEffect, useRef, useState} from "react";
import {BehaviorSubject} from "rxjs";
import {CursorNodePosition, Position} from "../model/types";


function NodeCursor(props: { treeSubject: BehaviorSubject<CursorNodePosition> }) {

    const [toolTip, setToolTip] = useState('Enter a key value');
    const [keyInput, setKeyInput] = useState('');
    const nodeCursorPos = useRef(null);


    useEffect(() => {


    }, [nodeCursorPos])

    const onNodeDrop = function (e: any) {
        const interactiveArea: SVGElement = document.querySelector(".tree-area")!;
        let currentNode: HTMLDivElement = document.querySelector(".node-cursor")!;
        let inputHolder: HTMLDivElement = document.querySelector(".value-input")!;

        const currentRect = interactiveArea.getBoundingClientRect();
        if (interactiveArea && isInRange(e, currentRect)) {
            currentNode.style.transform = 'scale(2) translate(-30%, -30%)'
            currentNode.classList.add('filled-node');
            inputHolder.style.display = 'flex';
        } else {
            if (currentNode.classList.contains('filled-node')) {
                currentNode.classList.remove('filled-node');
            }
            currentNode.classList.add('remove-node');
        }
    }

    const isInRange = function (e: any, currentRect: DOMRect) {
        return e.pageX >= currentRect.x && e.pageY > currentRect.y;
    }

    const onNodeKeyChange = function (event: any) {
        let circlePos: any = nodeCursorPos.current;
        if (circlePos && (event.key === 'Enter' || event.key === 'a')) {
            let boundingClientRect = circlePos.getBoundingClientRect();
            const divWidth = boundingClientRect.width;
            props.treeSubject.next({
                x: translateToCenter(boundingClientRect.x, divWidth),
                y: translateToCenter(boundingClientRect.y, divWidth),
                value: keyInput
            });
        }
    }

    const onValueUpdate = function ({target}: any) {
        setKeyInput(target.value);
        setToolTip('Enter to draw the node');
    }

    const translateToCenter = function (coordinate: number, divWidth: number) {
        return coordinate + (divWidth / 2)
    }

    return (
        <div ref={nodeCursorPos} onClick={onNodeDrop} className="node-cursor">
            {/*<div className ="tooltip">{toolTip}</div>*/}
            <div className="cursor-content">
                <input className="value-input"
                       placeholder="Key"
                       onChange={onValueUpdate}
                       onKeyPress={onNodeKeyChange}
                       value={keyInput}/>
                <div className="spin-circle" />
            </div>
        </div>);
}

export default NodeCursor;