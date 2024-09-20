import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";
import Toggle from "./Toggle";

const DetailLine = ({icon, content, action}) =>{
    return(
        <div className="flex justify-between items-center mb-1">
            {icon}
            <div className="flex justify-start items-center">
                {content}
            </div>
            {action}
        </div>
    )
}

const TransactionDetails = () =>{

    const [received, setReceived] = useState(false);
    const handleReceivedButtonClick = () =>{
        setReceived(prevState => !prevState)
    }

    return(
        <div className="grid grid-cols-1 gap-2 justify-items-center">
            <h1 className="transaction-detail-line">
                <DetailLine 
                    icon={<GiConfirmed size={20}/>} 
                    content={
                        received ? 'Recebido' : "Nao recebido"
                    } 
                    action={
                        <Toggle onClick={() => handleReceivedButtonClick()} state={received}/>
                    }>
                </DetailLine>
                <hr></hr>
            </h1>
            <h1 className="transaction-detail-line">
                <hr></hr>
            </h1>
            <h1 className="transaction-detail-line">
                <hr></hr>
            </h1>
            <h1 className="transaction-detail-line">
                <button></button>
                <hr></hr>
            </h1>
            <h1 className="transaction-detail-line">
                <hr></hr>
            </h1>
            <h1 className="transaction-detail-line">
                <hr></hr>
            </h1>
        </div>
    )
}
export default TransactionDetails