import {KdTreeNode} from "./bst";

const Point2D = function (x: number, y: number) {


    const distanceTo = function (point: Point): number {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    };

    const drawToFromTreeNode = function (svg: SVGSVGElement, kdTreeNode: KdTreeNode<Point, any>, lineColor: string) {
        drawTo(svg, kdTreeNode.point, lineColor);
    }

    const drawTo = function (svg: SVGSVGElement, point: Point, lineColor: string): void {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x.toString());
        line.setAttribute("y1", y.toString());
        line.setAttribute("x2", point.x.toString());
        line.setAttribute("y2", point.y.toString());
        line.setAttribute("stroke", lineColor);
        svg.appendChild(line);
    }

    // return new Point(x, y);
    return {
        x: x,
        y: y,
        distanceTo: distanceTo,
        drawTo: drawTo,
        drawToFromTreeNode: drawToFromTreeNode
    };

}


const Rectangle = function (xMin?: number, yMin?: number, xMax?: number, yMax?: number) {

    const contains = function (point: Point): boolean {
        return point.x >= this.xMin && point.x <= this.xMax && point.y >= this.yMin && point.y <= this.yMax;
    };

    return {
        xMin: xMin,
        yMin: yMin,
        xMax: xMax,
        yMax: yMax,
        contains: contains
    };
}

export interface Point {
    x: number;
    y: number;
}

export interface Rectangle2D {
    xMin?: number,
    yMin?: number,
    xMax?: number,
    yMax?: number
}


export {Point2D, Rectangle}
