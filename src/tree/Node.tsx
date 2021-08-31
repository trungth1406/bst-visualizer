import React, { PropsWithoutRef, PropsWithRef, ReactPropTypes, useEffect, useRef, useState } from 'react';
import { ViewNodeProps } from './types';


function Node(props: { id: number, nodeProps: ViewNodeProps, parentProps: ViewNodeProps }) {
    let nodeProps: any = props.nodeProps;
    // let [pos, setPos] = useState(nodeProps.position);
    // useState(nodeProps.dimension);
    let nodeRect: any = useRef(null);
    let { x, y } = nodeProps.viewProps.position
    console.log(props.parentProps);


    useEffect(() => {
        // console.log(nodeRect?.current?.getBoundingClientRect());

    }, [nodeRect])

    return (
        <div ref={nodeRect} className="w-24 h-24 font-bold text-gray-700 
        rounded-full bg-red-400 flex items-center justify-center font-mono"
            style={{ position: "absolute", top: y, left: x, }}>
            {nodeProps == null ? '' : nodeProps.node.key}
        </div>
    );
}

export default Node;

export interface NodePosition {
    x: number
    y: number
}