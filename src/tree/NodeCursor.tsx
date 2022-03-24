import React, {useEffect, useRef, useState} from "react";
import {BehaviorSubject} from "rxjs";
import {CursorNodePosition, Position} from "../model/types";
import {findDOMNode} from "react-dom";
import {isIntersected} from "../model/utils";


function NodeCursor(props: {
    treeSubject: BehaviorSubject<CursorNodePosition>,
    cursorPosition: BehaviorSubject<Position>,
    closestNode: BehaviorSubject<Position>
}) {

    const [keyInput, setKeyInput] = useState('');
    const nodeCursorPos = useRef(null);
    const spinCircles = useRef(null);


    const onNodeDrop = function (e: any) {
        const interactiveArea: SVGElement = document.querySelector(".tree-area")!;
        let currentNode: HTMLDivElement = document.querySelector(".node-cursor")!;
        let inputHolder: HTMLDivElement = document.querySelector(".value-input")!;

        const currentRect = interactiveArea.getBoundingClientRect();
        if (interactiveArea && isInRange(e, currentRect)) {
            currentNode.style.transform = 'scale(2) translate(-30%, -30%)'
            currentNode.classList.add('filled-node');
            inputHolder.style.display = 'flex';
            inputHolder.focus();
        } else {
            if (currentNode.classList.contains('filled-node')) {
                currentNode.classList.remove('filled-node');
            }
            currentNode.classList.add('remove-node');
        }
    }

    useEffect(() => {
        let subscription = props.closestNode.subscribe(closestPos => {
            const circlePos: any = nodeCursorPos.current;
            const boundingClientRect = circlePos.getBoundingClientRect();
            const divWidth = boundingClientRect.width;
            const cursorPos = {
                x: translateToCenter(boundingClientRect.x, divWidth),
                y: translateToCenter(boundingClientRect.y, divWidth),
            }
            const interactiveArea: SVGElement = document.querySelector(".tree-area")!;
            const spinCircleRef = document.querySelector('.spin-circle')
            if (closestPos && isIntersected(closestPos, cursorPos, interactiveArea)) {
                spinCircleRef!.classList.add('filled-add');
            } else {
                spinCircleRef!.classList.remove('filled-add');
            }

        });
        return () => {
            subscription.unsubscribe();
        }
    }, [props.closestNode]);

    const isInRange = function (e: any, currentRect: DOMRect) {
        return e.pageX >= currentRect.x && e.pageY > currentRect.y;
    }

    const reattachNodeCursor = function (event: any) {
        let nodeCursor: HTMLDivElement = document.querySelector(".node-cursor")!;
        let valueInput: HTMLInputElement = document.querySelector(".value-input")!;
        if (nodeCursor.classList.contains('filled-node')) {
            nodeCursor.classList.remove('filled-node');
        }

        valueInput.value = '';
        valueInput.blur();
        // setKeyInput('');
        nodeCursor.style.transform = '';
        if (nodeCursor.classList.contains('remove-node')) nodeCursor.classList.remove('remove-node')
        nodeCursor.style.display = 'flex';
        nodeCursor.style.top = (event.pageY) + "px"
        nodeCursor.style.left = (event.pageX) + "px"
        window.addEventListener('mousemove', cursorMove, true);
        nodeCursor.addEventListener('click', dropNode, true);

        function dropNode(e: any) {
            window.removeEventListener('mousemove', cursorMove, true);
        }

        function cursorMove(e: any) {
            if (nodeCursor) {
                nodeCursor.style.top = (e.pageY) + "px"
                nodeCursor.style.left = (e.pageX) + "px"
                props.treeSubject.next({x: e.pageX, y: e.pageY ,value : null });
            }
        }


    }

    const onNodeKeyChange = function (event: any) {
        let circlePos: any = nodeCursorPos.current;
        if (circlePos && (event.key === 'Enter')) {
            const boundingClientRect = circlePos.getBoundingClientRect();
            const divWidth = boundingClientRect.width;
            props.treeSubject.next({
                x: translateToCenter(boundingClientRect.x, divWidth),
                y: translateToCenter(boundingClientRect.y, divWidth),
                value: keyInput
            });

            props.treeSubject.next({
                x: translateToCenter(boundingClientRect.x, divWidth),
                y: translateToCenter(boundingClientRect.y, divWidth),
                value: null
            });
            reattachNodeCursor(event);
        }
    }

    const onValueUpdate = function ({target}: any) {
        setKeyInput(target.value);
    }

    const translateToCenter = function (coordinate: number, divWidth: number) {
        return coordinate + (divWidth / 2)
    }

    const onEscapeKeyPressed = function (e: any) {
        if (e.key === 'Escape') {
            reattachNodeCursor(e);
        }
    }

    return (
        <div ref={nodeCursorPos} onClick={onNodeDrop} className="node-cursor">
            <div className="cursor-content">
                <input
                    className="value-input"
                    placeholder="Key"
                    onChange={onValueUpdate}
                    onKeyPress={onNodeKeyChange}
                    onKeyDown={onEscapeKeyPressed}
                    value={keyInput}/>
                <div ref={spinCircles} className="spin-circle"/>
            </div>
        </div>);
}

export default NodeCursor;
