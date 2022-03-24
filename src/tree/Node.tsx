import {MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {findDOMNode} from 'react-dom';
import ConnectedLine from './ConnectedLine/ConnectedLine';
import {BSTViewNodeProps, CursorNodePosition, Position, ViewNodeProps} from '../model/types';
import {BehaviorSubject, Subscription, takeWhile, zip} from "rxjs";
import {htmlCoordinateToSvgCoordinate, isIntersected, svgCoordinateToHtmlCoordinate} from "../model/utils";
import NodeCursor from './NodeCursor';
import {TreeNode} from "../model/bst";


function Node(props: {
    id: number, nodeProps: TreeNode<number, any> | null, parentProps: TreeNode<number, any>| null,
    container: any, currentClosest: Position | undefined,
    cursorPos: BehaviorSubject<Position>, closestNode: BehaviorSubject<Position>
}) {
    let nodeProps = props.nodeProps;
    let nodePosition = nodeProps?.viewProps;
    let parentContainer = findDOMNode(props.container.current) as Element;

    let nodeRect: any = useRef(null);
    let textRef: any = useRef(null);
    let queryNode: SVGCircleElement = findDOMNode(nodeRect.current) as SVGCircleElement;
    let queryText: SVGCircleElement = findDOMNode(textRef.current) as SVGCircleElement;


    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isClosest, setIsClosest] = useState<boolean>(false);

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
                x: nodePosition!.x, y: nodePosition!.y
            },
            mousePos: {x: 0, y: 0},
            isDragging: false
        });
    }, [nodePosition]);

    useEffect(() => {
        let cursorNodePosition: Subscription;
        if (!(props.nodeProps!.parent) && props.currentClosest) {
            setIsClosest(props.currentClosest.x === nodePosition?.x && props.currentClosest.y === nodePosition.y);
        }
        return () => {
            if (cursorNodePosition) {
                cursorNodePosition.unsubscribe();
            }
        }
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
            <foreignObject ref={nodeRect} width="100" height="100" x={currentPos.pos.x} y={currentPos.pos.y}
                           transform='translate(-50,-50)'>
                <div className="circle">
                    <span className="node-hint">{isClosest  ? 'Drop a node here to add' : nodeProps?.key}</span>
                </div>
            </foreignObject>

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

