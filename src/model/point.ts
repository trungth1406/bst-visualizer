const Point2D = function (x: number, y: number) {

    return {
        x: () => {
            return x
        },
        y: () => {
            return y
        }
    }
}


const Rectangle = function (xMin?: number, yMin?: number, xMax?: number, yMax?: number){
    return {
        xMin: xMin,
        yMin: yMin,
        xMax: xMax,
        yMax: yMax
    }
}

export interface Point {
    x: number;
    y: number
}

export interface Rectangle2D {
    xMin?: number,
    yMin?: number,
    xMax?: number,
    yMax?: number
}


export { Point2D, Rectangle }
