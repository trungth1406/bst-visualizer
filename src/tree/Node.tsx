import {MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {findDOMNode} from 'react-dom';
import ConnectedLine from './ConnectedLine/ConnectedLine';
import {Position, ViewNodeProps} from '../model/types';
import {BehaviorSubject, takeWhile} from "rxjs";
import {generateSvgPoint} from "../model/utils";


const toSvgCoordinates = function (container: any, element: any, x: number, y: number) {
    let svgPoint = container.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;
    return svgPoint.matrixTransform(element.getScreenCTM().inverse());
}

function Node(props: { id: number, nodeProps: ViewNodeProps, parentProps: ViewNodeProps, container: any, currentClosest: Position | undefined }) {
    let nodeProps = props.nodeProps;
    let parentContainer = findDOMNode(props.container.current) as Element;

    let nodeRect: any = useRef(null);
    let textRef: any = useRef(null);
    let queryNode: SVGCircleElement = findDOMNode(nodeRect.current) as SVGCircleElement;
    let queryText: SVGCircleElement = findDOMNode(textRef.current) as SVGCircleElement;


    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isClosest, setIsClosest] = useState<boolean>(false);
    // const {x,y} = toSvgCoordinates(props.container.current, props.container.current, nodeProps.viewProps.position.x, nodeProps.viewProps.position.y);

    let [currentPos, setCurrentPos] = useState<NodePosition>(
        {
            pos:
                {
                    x: 0,
                    y: 0
                },
            mousePos: {x: 0, y: 0},
            isDragging: false
        });

    useEffect(() => {
        setCurrentPos({
            pos: {
                x: nodeProps.viewProps.position.x, y: nodeProps.viewProps.position.y
            },
            mousePos: {x: 0, y: 0},
            isDragging: false
        });

    }, [nodeProps.viewProps.position]);

    useEffect(() => {
        setIsClosest(props.currentClosest?.x === currentPos.pos.x)

    }, [props.currentClosest])


    useEffect(() => {
        if (isDragging) {
            parentContainer.addEventListener('mousemove', cursorMove, true)
        }
        return () => {
            parentContainer.removeEventListener('mousemove', cursorMove, true)
        }
    }, [isDragging])


    const onMouseDown = function (e: any) {
        setIsDragging(!isDragging);
    }


    const cursorMove = function (event: any) {
        if (queryNode) {
            let boundingRect = parentContainer.getBoundingClientRect();
            queryNode.setAttribute('cx', String(event.clientX - boundingRect?.left));
            queryNode.setAttribute('cy', String(event.clientY - boundingRect?.top));
            queryText.setAttribute('x', String(event.clientX - boundingRect?.left));
            queryText.setAttribute('y', String(event.clientY - boundingRect?.top));
        }
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
                    ref={nodeRect}
                    cx={currentPos.pos.x} cy={currentPos.pos.y} r={50} color="red"
                    fill={'white'} strokeWidth={2}
            >

            </circle>
            <text onMouseDown={onMouseDown} ref={textRef} className="node-text" x={currentPos.pos.x}
                  y={currentPos.pos.y} textAnchor="middle" strokeWidth="12px" fontSize="3rem">
                {isClosest ? 'Drop a node here to add' : nodeProps.node.key}
            </text>
            {/* <ConnectedLine container={props.container} parentRef={parentProps} childRef={nodeProps} nodePos={currentPos} /> */}
        </g>
    );
}

export default Node;


interface NodePosition {
    pos: Position
    mousePos: Position
    isDragging: boolean | false
}

