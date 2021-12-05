import React from "react";
import Diagram from "../diagram/Diagram";
import InteractiveToolBar from "./InteractiveToolBar";
import {BehaviorSubject} from "rxjs";


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