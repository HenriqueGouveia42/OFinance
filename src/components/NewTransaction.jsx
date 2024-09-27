import { FaArrowCircleLeft } from "react-icons/fa";
import Numpad from "./Numpad.jsx";
import TransactionDetails from "./TransactionDetails.jsx"
import { useState } from "react";

const NewTransaction = ({type}) => {

    const [visible, setVisible] = useState(false);
    const handleVisibleClick = () =>{
        setVisible(prevValue => !prevValue)
    }

    return(
        <>
            <div className= "flex flex-col w-[20rem]">
                <div className={`flex flex-col w-full h-1/5 ${type === 'revenue' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <div className="flex items-center">
                            <button className="p-3 rounded-3xl hover:cursor-pointer"><FaArrowCircleLeft color="white" size="25"/></button>
                            <h1 className="font-medium text-white">Nova Receita</h1>
                        </div>
                    <div className="flex items-center">
                            <div className="flex flex-col">
                                <h1 className="text-xs text-white">Valor da Receita</h1>
                                <button className="text-lg text-white hover:cursor-pointer hover:bg-green-600"
                                onClick={()=>handleVisibleClick()}>
                                {((parseInt('150'))).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</button>
                            </div>
                        </div>
                </div>
                <div className="flex flex-col w-full h-4/5 bg-white">
                    {visible && <Numpad/> }
                    {!visible && <TransactionDetails/>}
                </div>
            </div>
        </>
    )
}
export default NewTransaction