
import { MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import ConnectedLine from './ConnectedLine/ConnectedLine';
import { Position, ViewNodeProps } from './types';
import { generateSvgPoint } from './utils';




function Node(props: { id: number, nodeProps: ViewNodeProps, parentProps: ViewNodeProps, container: any }) {
    let nodeProps = props.nodeProps;
    let treeContainer = props.container;
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


    useLayoutEffect(() => {
        let relativeSvgPoint = generateSvgPoint(treeContainer.current, nodeRect.current, nodeProps.viewProps.position.x, nodeProps.viewProps.position.y);
        animateCircle();
        setCurrentPos({
            pos: {
                x: relativeSvgPoint.x, y: relativeSvgPoint.y
            },
            mousePos: { x: 0, y: 0 },
            isDragging: false
        });

    }, [props])



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

    const animateCircle = function () {
        let circle = document.getElementById("node-" + props.id);
        let interval = 30;
        let currentAngle = 0;
        let timer = window.setInterval(function () {
            circle?.setAttribute("stroke-dasharray", currentAngle + ", 20000");
            if (currentAngle >= 360) {
                window.clearInterval(timer);
            }
            currentAngle += 15;
        }, interval);
    }

    return (
        <g>
            <circle id={"node-" + props.id} className="node"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                ref={nodeRect}
                cx={currentPos.pos.x} cy={currentPos.pos.y} r={50} color="red"
                fill="white" stroke="#5c6274"
            >

            </circle>
            <text font-size="2em" className="node-text" x={currentPos.pos.x} y={currentPos.pos.y} text-anchor="middle" stroke-width="12px" dy=".3em">
                {nodeProps == null ? '' : nodeProps.node.key}
            </text>
            <ConnectedLine container={props.container} parentRef={parentProps} childRef={nodeProps} nodePos={currentPos} />
        </g >


    );
}

export default Node;


interface NodePosition {
    pos: Position
    mousePos: Position
    isDragging: boolean | false
}