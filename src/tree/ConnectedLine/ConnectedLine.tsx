import React, { useEffect, useRef, useState } from 'react';
import { Position, ViewNodeProps, ViewProps } from '../../model/types';
import styles from './ConnectedLine.module.css';

const ConnectedLine = function (props: { container: any, parentRef: ViewNodeProps, childRef: ViewNodeProps, nodePos: any }) {

  let lineRef: any = useRef(null);
  let [linePos, setLinePos] = useState<LinePosition>({
    from: {
      x: 0,
      y: 0
    },
    to: {
      x: 0,
      y: 0
    }
  });

  useEffect(() => {
    console.log(props.nodePos);

    if (props.parentRef) {
      // let startPos = generateSvgPoint(props.container.current, lineRef.current, parentPos.x, parentPos.y);
      // let endPos = generateSvgPoint(props.container.current, lineRef.current, props.nodePos.pos.x, props.nodePos.pos.y);
      // setLinePos({
      //   from: startPos,
      //   to: props.nodePos.pos
      // })
    }
  }, [props.nodePos]);


  return (
    <line ref={lineRef}
      x1={linePos.from.x} y1={linePos.from.y}
      x2={linePos.to.x} y2={linePos.to.y}
      stroke="black" fill="orange" >
    </line>
  )
};

export default ConnectedLine;


interface LinePosition {
  from: Position
  to: Position
}
