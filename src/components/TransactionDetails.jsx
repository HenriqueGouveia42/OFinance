import Toggle from "./Toggle"
import { useState } from "react";

const DetailLine = ({icon, content, action}) =>{
    return(
        <>
            <div className="grid grid-cols-3 items-center rounded-md p-6 m-1 w-full">
                <div className="text-left">{icon}</div>
                <div className="text-center">{content}</div>
                <div className="text-right">{action}</div>
            </div>
            <hr></hr>
        </>
        
    )
}

const TransactionDetails = () =>{

    return(
        <div className="w-full h-full">
            <DetailLine icon="icon" content={"content"} action={<Toggle/>}/>
        </div>
    )
}
export default TransactionDetails