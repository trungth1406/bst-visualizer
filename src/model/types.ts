import {TreeNode} from "./bst";

export interface ViewNodeProps {

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

export interface CursorNodePosition {
    x: number
    y: number
    value: any
}

export interface BSTViewNodeProps extends ViewNodeProps {
    node: TreeNode<any, any> | null,
    parentNode: BSTViewNodeProps | null,
    boundingRect: any;
    viewProps: ViewProps
    left: BSTViewNodeProps | null,
    right: BSTViewNodeProps | null,
    animationPath?: string[];
    isRoot: boolean;
    bstRootNode?: BSTViewNodeProps | null;
}

export interface ViewRootNodeAction {
    type: string
    rootNode: ViewNodeProps;
}

export interface BSTAction {
    currentRoot: BSTViewNodeProps;
    newNode: BSTViewNodeProps;
    type: string;
}


export interface RootNodeState {
    rootNodes: ViewNodeProps[];
}
