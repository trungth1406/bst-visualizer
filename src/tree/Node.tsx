import { Graphics, Stage } from '@inlet/react-pixi';
import { SVG } from '@svgdotjs/svg.js';
import { MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import ConnectedLine from './ConnectedLine/ConnectedLine';
import { ConnectedPath, Position, ViewNodeProps } from './types';




function Node(props: { id: number, nodeProps: ViewNodeProps, parentProps: ViewNodeProps, container: any }) {
    let nodeProps = props.nodeProps;
    let parentProps = props.parentProps;
    let nodeRect: any = useRef(null);




    let [currentPos, setCurrentPos] = useState<NodePosition>(
        {
            pos:
            {
                x: nodeProps.viewProps.position.x,
                y: nodeProps.viewProps.position.y
            },
            mousePos: { x: 0, y: 0 },
            isDragging: false
        });

    let [path, setPath] = useState<ConnectedPath>({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } });

    useLayoutEffect(() => {
        setCurrentPos({
            pos: {
                x: nodeProps.viewProps.position.x, y: nodeProps.viewProps.position.y
            },
            mousePos: { x: 0, y: 0 },
            isDragging: false
        });
        console.log(parentProps, currentPos);

        if (parentProps && currentPos) {
            let parentPos = parentProps.viewProps.position;
            let currentPos = nodeProps.viewProps.position;
            console.log(parentPos);
            console.log(currentPos);

            setPath({
                from: {
                    x: parentPos.x,
                    y: parentPos.y
                },
                to: {
                    x: currentPos.x,
                    y: currentPos.y
                }
            })
        }


    }, [nodeRect, nodeProps])

    const onMouseDown = function (e: any) {
        if (e.button !== 0) return
        let pos = findDOMNode(props.container.current) as Element;
        let boundingRect = pos.getBoundingClientRect();
        setCurrentPos({
            pos: currentPos.pos,
            mousePos: {
                x: e.clientX - boundingRect?.left,
                y: e.clientY - boundingRect?.top
            },
            isDragging: true
        })



        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseUp = function (e: any) {
        setCurrentPos({ ...currentPos, isDragging: false })
        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseMove = function (e: any) {
        if (!currentPos.isDragging)
            return;
        let currentCon = findDOMNode(props.container.current) as Element;
        let boundingRect = currentCon.getBoundingClientRect();

        setCurrentPos({
            pos: {
                x: ((e.pageX - boundingRect.x) - currentPos.mousePos.x + currentPos.pos.x),
                y: ((e.pageY - boundingRect.y) - currentPos.mousePos.y + currentPos.pos.y)
            },
            mousePos: { x: e.pageX - boundingRect.x, y: e.pageY - boundingRect.y },
            isDragging: true
        });

        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <g>

            <circle id={"node-" + props.id}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                ref={nodeRect} className="w-24 h-24 font-bold text-gray-700 
        rounded-full bg-red-400 flex items-center justify-center font-mono"
                style={{
                    position: "absolute",
                    cursor: "pointer",
                    zIndex: 99,

                }}
                cx={currentPos.pos.x} cy={currentPos.pos.y} r={90} color="red"
                fill="rgba(248, 113, 113,1)" stroke="none"
            >

            </circle>
            <text x={currentPos.pos.x} y={currentPos.pos.y} text-anchor="middle" stroke-width="10px" dy=".3em">
                {nodeProps == null ? '' : nodeProps.node.key}
            </text>
        </g >


    );
}

export default Node;


interface NodePosition {
    pos: Position
    mousePos: Position
    isDragging: boolean | false
}