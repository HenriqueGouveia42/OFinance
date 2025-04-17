import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi"; 
import { useContext, useEffect, useState} from 'react';
import { EyeContext} from "../contexts/EyeContext";
import { TransactionTypeContext } from "../contexts/TransactionTypeContext";
import { useAuth } from "../contexts/AuthContext"
import { lazy} from 'react';
import { useNavigate } from "react-router-dom";

const Notifications = lazy(() => import('./Notifications'));


const MonthContent = ({paidMonthYearTransactions, month}) => {

    const { isVisible, toggleVisibility } = useContext(EyeContext);
    const { handleTransactionType } = useContext(TransactionTypeContext);
    
   

    const {userData} = useAuth();
    const navigate = useNavigate();
    
    var totalBalanceFromAllAccounts = 0;
    
    userData.accounts.forEach((acc) =>{
        totalBalanceFromAllAccounts += acc.balance;
    })

    if(!paidMonthYearTransactions){
        return <p>Carregando...</p>
    }

    var receita_total_paga = 0;
    var despesa_total_paga = 0;

    paidMonthYearTransactions.forEach((t) =>{
        if(t.type == 'expense'){
            despesa_total_paga = t._sum.amount;
        }else{
            receita_total_paga = t._sum.amount;
        }
    })

    return(
        <>
            <div className="flex flex-col space-y-2">
                <div className="flex justify-center">
                    <h1 className="text-xs">Saldo Total de Todas as Contas</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {isVisible ? <h1 className="font-mono text-xs">{totalBalanceFromAllAccounts.toLocaleString('pt-Br', {style: 'currency', currency: 'BRL'})}</h1> :  <div className="bg-black font-mono text-xs w-30">null</div> }
                    <div className="my-2" onClick={toggleVisibility} style={{cursor: 'pointer'}}>
                        {isVisible ? <FiEye size={20} className="eye-icon" /> : <FiEyeOff size={20} className="eye-icon" />}
                    </div>
                </div>
            <div className="flex justify-center mt-1 space-x-5"> {/*"Revenue" and "Expense" icons*/}
                <div className="flex mx-3 items-center"> 
                    <FaArrowTrendUp className="revenue-icon mr-2" onClick={()=>{
                        handleTransactionType('revenue');
                        navigate("/newtransaction");
                    }}/>
                    <div className="flex flex-col">
                        <h1 className="font-mono text-xs">Receita total recebida em {month}</h1>
                        {isVisible ? <h1 className="font-bold text-green-500 text-xs ">{receita_total_paga.toLocaleString('pt-Br', {style: 'currency', currency: 'BRL'})}</h1> : <div className="bg-black font-mono text-xs">null</div>}
                    </div>
                </div>
                <div className="flex mx-3 items-center">
                    <FaArrowTrendDown className="expense-icon mr-2" onClick={() =>{
                        handleTransactionType('expense');
                        navigate("/newtransaction");
                    }}/>
                    <div className="flex flex-col">
                        <h1 className="font-mono text-xs">Despesa total paga em {month}</h1>
                        {isVisible ? <h1 className="font-bold text-red-600 font-mono text-xs">{despesa_total_paga.toLocaleString('pt-Br', {style: 'currency', currency: 'BRL'})}</h1> : <div className="bg-black font-mono text-xs">null</div>}
                    </div>
                </div>
            </div>
                <Notifications />
            </div>
        </>
    )
}
export default MonthContent