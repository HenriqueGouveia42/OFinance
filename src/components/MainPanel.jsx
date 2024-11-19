import Month from "./Month"
import { useState, useContext } from "react";
import { EyeContext } from "../Contexts/EyeContext.jsx";
import NewTransaction from "./NewTransaction.jsx";





const MainPanel = () =>{
    
    return(
        <>
            <div className="flex flex-col mt-16 ml-36 overflow-auto w-screen h-screen bg-gray-500 p-8 items-center">
                <div className="columns-7xl">
                    <Month />
                    <NewTransaction type='revenue'/>
                </div>
            </div>
            
        </>
    )
}
export default MainPanel




