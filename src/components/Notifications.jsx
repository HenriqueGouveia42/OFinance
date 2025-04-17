import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { GoArrowDown } from "react-icons/go";
import { useContext, useEffect, useState } from 'react';
import { EyeContext } from "../contexts/EyeContext";

const NotificationsContent = ({ type='', quantity, amount }) => {


    const isIncome = type === 'revenue';
    const {isVisible} = useContext(EyeContext);

    return (
        <div className="flex flex-col bg-gray-300 p-2 rounded-2xl mx-3 hover:bg-gray-500" onClick={() =>{alert("Eu vou exibir as transacoes pendentes")}}>
            <div className="flex items-center">
                {isIncome ? <FaArrowCircleUp size={14} /> : <FaArrowCircleDown size={14} /> }
                <h1 className={`rounded-2xl p-1 ml-16 items-center text-xs ${isIncome ? 'bg-green-400' : 'bg-red-400'}`}>
                    +{isVisible ? quantity : ''}
                </h1>
            </div>
            <div>
                <div className="text-xs font-bold ">
                    <h1>{isIncome ? 'Receitas Pendentes (Não recebidas)' : 'Despesas Pendentes (Não pagas)'}</h1>
                    <h1 className={isIncome ? 'text-green-400' : 'text-red-400'}>
                        {isVisible ? amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}
                    </h1>
                </div>
            </div>
        </div>
    );
};


const Notifications = () => {

    const [unpaid, setUnpaid] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getUnpaidTransactions = async () => {
            try {
                const fetchUnpaidTransactions = await fetch(`${import.meta.env.VITE_API_URL}/transaction/readUnpaidTransactions`, {
                    method: 'GET',
                    credentials: 'include'
                });
    
                if (fetchUnpaidTransactions.ok) {
                    const data = await fetchUnpaidTransactions.json();
                    setUnpaid(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Erro ao buscar transações não pagas', error);
            }
        };
        getUnpaidTransactions();
    }, []);
    
    if (loading || unpaid === undefined || unpaid === null) {
        return <p>Carregando..</p>;
    }
    
    
    let pendingRevenueCount = unpaid.pendingRevenueCount;
    let pendingRevenueTotal = unpaid.pendingRevenueTotal;

    let pendingExpenseCount = unpaid.pendingExpenseCount;
    let pendingExpensesTotal = unpaid.pendingExpensesTotal;
    
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col text-xs items-center font-bold">
                <div className="flex mt-5 space-x-2">
                    <h1 >Não recebidos / Não pagos</h1>
                    <GoArrowDown size={20} className="bg-slate-500 rounded-2xl" />
                </div>
                <h1>(Todos os meses)</h1>
            </div>
            <div className="mt-5 flex justify-start">
                <div className="flex justify-center">
                    {
                        pendingRevenueCount > 0 ? 
                        (<NotificationsContent type="revenue" quantity={pendingRevenueCount} amount={pendingRevenueTotal} />) 
                        :
                        <div className="bg-gray-300 p-2 rounded-2xl mx-3 w-36 text-sm hover:bg-gray-500" onClick={(() => alert("Vou mostrar as receitas pendentes"))}>Nenhuma receita pendente (Não recebida)</div>
                    }
                    {pendingExpenseCount > 0 ? (
                        <NotificationsContent type="expense" quantity={pendingExpenseCount} amount={pendingExpensesTotal} />
                    ) : <div className="bg-gray-300 p-2 rounded-2xl mx-3 w-36 text-sm hover:bg-gray-500" onClick={(() => alert("Vou mostrar as despesas pendentes"))} >Nenhuma despesa pendente (Não paga)</div>}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
