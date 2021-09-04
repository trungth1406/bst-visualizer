import React from "react";
import Tree from "../tree/Tree";

function MainContent() {

    return (
        <div className="flex-row align-middle container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            <div className="flex flex-row w-full h-full rounded border-dashed border-2 border-gray-300"  style={{ width: "100%", height: "900px" }}>
                <Tree></Tree>
            </div>
        </div>
    )
}

export default MainContent;