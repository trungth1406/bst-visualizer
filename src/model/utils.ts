export function generateSvgPoint(container: any, element: any, x: number, y: number) {
    let svgPoint = container.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;

    return svgPoint.matrixTransform(element.getScreenCTM().inverse());
}
