import Month from "./Month"
import { useState, useContext } from "react";
import { EyeContext } from "../Contexts/EyeContext.jsx";

const MainPanel = () =>{
    return(
        <>
            <div className="flex flex-col mt-16 ml-36 overflow-auto w-screen h-screen bg-gray-500 p-8">
                <div className="custom-md:flex-row custom-md:space-x-6 custom-md:space-y-0">
                    <Month />
                </div>
            </div>
        </>
    )
}
export default MainPanel




