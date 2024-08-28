import { BiNotification } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi"; 
import transactions from "../assets/transactions.json"
import Notifications from "./Notifications"
import { useContext } from 'react';
import { EyeContext } from "../Contexts/EyeContext";


const MonthContent = () => {
    var receita_total = 0;
    var despesa_total = 0;

    transactions.map(item=>{
        item.income ? (receita_total += item.amount) : (despesa_total += item.amount)
    })

    const {isVisible, toggleVisibility} = useContext(EyeContext);
    return(
        <>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <h1 className="text-xs">Saldo em Contas</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {isVisible ? <h1 className="font-mono text-xs">R$5.400,00</h1> :  <div className="bg-black w-30">null</div> }
                    <div className="my-2" onClick={toggleVisibility} style={{cursor: 'pointer'}}>
                        {isVisible ? <FiEye size={20} className="eye-icon" /> : <FiEyeOff size={20} className="eye-icon" />}
                    </div>
                </div>
            <div className="flex justify-center mt-1 space-x-5"> {/*"Revenue" and "Expense" icons*/}
                <div className="flex mx-3 items-center"> 
                    <FaArrowTrendUp className="revenue-icon mr-2" />
                    <div className="flex flex-col">
                        <h1 className="text-xs">Receitas</h1>
                        {isVisible ? <h1 className="font-bold text-green-500 text-xs ">{receita_total.toLocaleString('pt-Br', {style: 'currency', currency: 'BRL'})}</h1> : <div className="bg-black">null</div>}
                    </div>
                </div>
                <div className="flex mx-3 items-center">
                    <FaArrowTrendDown className="expense-icon mr-2" />
                    <div className="flex flex-col">
                        <h1 className="text-xs">Despesas</h1>
                        {isVisible ? <h1 className="font-bold text-red-600 text-xs">{despesa_total.toLocaleString('pt-Br', {style: 'currency', currency: 'BRL'})}</h1> : <div className="bg-black">null</div>}
                    </div>
                </div>
            </div>
                <Notifications/>
            </div>
        </>
    )
}
export default MonthContent