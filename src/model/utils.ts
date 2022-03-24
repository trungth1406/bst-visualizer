import {Position} from "./types";

export function htmlCoordinateToSvgCoordinate(container: any, x: number, y: number) {
    let svgPoint = container.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;

    return svgPoint.matrixTransform(container.getScreenCTM().inverse());
}


export function svgCoordinateToHtmlCoordinate(container: any, x: number, y: number) {
    let svgPoint = container.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;

    return svgPoint.matrixTransform(container.getScreenCTM());
}


export function isIntersected(currentClosest: Position | undefined, cursorRect: Position, svgContainer: any) {
    if (currentClosest) {
        const htmlPoint = svgCoordinateToHtmlCoordinate(svgContainer, currentClosest.x, currentClosest.y);
        let absoluteCenterDiff = Math.abs(28 - 50);
        let centerDiff = 28 + 50;
        let distance =
            Math.sqrt(Math.pow(htmlPoint.x - cursorRect.x, 2) + Math.pow(htmlPoint.y - cursorRect.y, 2));
        return (absoluteCenterDiff <= distance && distance <= centerDiff) || distance + 50 < 28 + 50;
    }
    return null;
}
