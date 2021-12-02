import React from "react";
import Diagram from "../diagram/Diagram";
import NodeCursor from "../tree/NodeCursor";
import Tree from "../tree/Tree";
import InteractiveToolBar from "./InteractiveToolBar";

function MainContent() {

    return (
        <div className="content-container">
            <InteractiveToolBar />
            <div className="main-content-container">
                <Diagram />
            </div>

        </div>
    )
}

export default MainContent;