import { TreeNode } from "./bst";

export interface ViewNodeProps {
    node: TreeNode<any, any>,
    parentNode: ViewNodeProps | null,
    boundingRect: any;
    viewProps: ViewProps
}

export interface ViewProps {
    position: Position
    dimension?: Dimension
}

export interface Position {
    x: number
    y: number
}

export interface Dimension {
    width: number | undefined;
    height: number | undefined;
}