import React, { useEffect, useRef, useState } from "react";


function NodeCursor(props: { onNodeConfirm: any }) {

    const [toolTip, setToolTip] = useState('Enter a key value');
    const [keyInput, setKeyInput] = useState('');
    const nodeCursorPos = useRef(null);
    const interactiveArea: SVGElement = document.querySelector(".tree-area")!;
    let currentNode: HTMLDivElement = document.querySelector(".node-cursor")!;
    let inpuHolder: HTMLDivElement = document.querySelector(".value-input")!;

    useEffect(()=>{ 
        console.log(nodeCursorPos.current);
        
    }, [nodeCursorPos])

    const onNodeDrop = function (e: any) {
        const currentRect = interactiveArea.getBoundingClientRect();
        if (interactiveArea && isInRange(e, currentRect)) {
            currentNode.style.transform = 'scale(2) translate(-30%, -30%)'
            currentNode.classList.add('filled-node');
            inpuHolder.style.display = 'flex';
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

    const onNodeKeyChange = function ({target}: any) {
        setToolTip('Enter to draw the node');
        setKeyInput(target.value);
    }

    return (
        <div ref={nodeCursorPos}  onClick={onNodeDrop} className="node-cursor" onChange={onNodeKeyChange}>
            {/* <div className ="tooltip">{toolTip}</div> */}
            <div className="cursor-content">
                <input className="value-input"
                    placeholder="Key"
                    value={keyInput}
                    onKeyDown={(e) => props.onNodeConfirm(e, keyInput , currentNode)} />
                <svg className="spin-circle" viewBox="0 0 24 24">
                </svg>
            </div>
        </div>);
}

export default NodeCursor;