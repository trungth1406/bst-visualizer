import React from "react";
import { IoAddCircleOutline } from 'react-icons/io5'
import { TiDeleteOutline } from 'react-icons/ti'
import { MdUpdate } from 'react-icons/md'
import { BiSearchAlt } from 'react-icons/bi'
import { BsNodePlus } from 'react-icons/bs'


function InteractiveToolBar() {




    const newNode = function (event: any) {

        let nodeCursor: HTMLDivElement = document.querySelector(".node-cursor")!;
        let valueInput: HTMLDivElement = document.querySelector(".value-input")!;
        if (nodeCursor.classList.contains('filled-node')) {
            nodeCursor.classList.remove('filled-node');
        }
        
        valueInput.style.display = 'none';
        nodeCursor.style.transform = '';
        if(nodeCursor.classList.contains('remove-node')) nodeCursor.classList.remove('remove-node')
        nodeCursor.style.display = 'flex';
        nodeCursor.style.top = (event.pageY) + "px"
        nodeCursor.style.left = (event.pageX) + "px"
        window.addEventListener('mousemove', cursorMove, true);
        nodeCursor.addEventListener('click', dropNode, true);
    
        function dropNode(e: any) {
            window.removeEventListener('mousemove', cursorMove , true);
        }

        function cursorMove(e: any) {
            if (nodeCursor) {
                nodeCursor.style.top = (e.pageY) + "px"
                nodeCursor.style.left = (e.pageX) + "px"
            }
        }
        

    }


    return (
        <div className="toolbar-container">
            <div className="action-container group" onClick={(e) => newNode(e)}>
                <IoAddCircleOutline className="action-icon group-hover:opacity-0" size="30" color="white" />
                <BsNodePlus className="action-icon first-hidden group-hover:opacity-100" size="30" color="white" />
                <span className="hover-content group-hover:scale-100">Click to create new node</span>
            </div>

            <div className="action-container group">
                <BiSearchAlt className="" size="30" color="white" />
                <span className="hover-content group-hover:block">Search a Node</span>
            </div>


            <div className="action-container group">
                <TiDeleteOutline className="" size="30" color="white" />
                <span className="hover-content group-hover:block">Remove existing Node</span>

            </div>

            <div className="action-container group">
                <MdUpdate className="" size="30" color="white" />
                <span className="hover-content group-hover:block">Update existing Node</span>

            </div>

        </div>
    )
}


export default InteractiveToolBar;

function dropNode(arg0: string, dropNode: any) {
    throw new Error("Function not implemented.");
}
