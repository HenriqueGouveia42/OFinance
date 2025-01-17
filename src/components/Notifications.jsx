import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { GoArrowDown } from "react-icons/go";
import { useContext } from 'react';
import { EyeContext } from "../Contexts/EyeContext";


const NotificationsContent = ({ type, quantity, amount }) => {
    const isIncome = type === 'income';
    const {isVisible, toggleVisibility} = useContext(EyeContext);
    return (
        <div className="flex flex-col bg-gray-300 p-2 rounded-2xl mx-3">
            <div className="flex items-center">
                {isIncome ? <FaArrowCircleUp size={14} /> : <FaArrowCircleDown size={14} /> }
                <h1 className={`rounded-2xl p-1 ml-16 items-center text-xs ${isIncome ? 'bg-green-400' : 'bg-red-400'}`}>
                    +{isVisible ? quantity : ''}
                </h1>
            </div>
            <div>
                <div className="text-xs font-bold">
                    <h1>{isIncome ? 'Receitas Pendentes' : 'Despesas Pendentes'}</h1>
                    <h1 className={isIncome ? 'text-green-400' : 'text-red-400'}>
                        {isVisible ? amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}
                    </h1>
                </div>
            </div>
        </div>
    );
};


const Notifications = () => {
    
    let qntd_receitas_pendentes = 12;
    let receitas_pendentes = 1503;

    let qntd_despesas_pendentes = 7;
    let despesas_pendentes = 3000;

    return (
        <div className="flex flex-col items-center">
            <div className="flex mt-5 space-x-2">
                <h1 className="font-bold text-xs">Pendências e alertas</h1>
                <GoArrowDown size={20} className="bg-slate-500 rounded-2xl" />
            </div>
            <div className="mt-5 flex justify-start">
                <div className="flex justify-center">
                    {qntd_receitas_pendentes > 0 && (
                        <NotificationsContent type="income" quantity={qntd_receitas_pendentes} amount={receitas_pendentes} />
                    )}
                    {qntd_despesas_pendentes > 0 && (
                        <NotificationsContent type="expense" quantity={qntd_despesas_pendentes} amount={despesas_pendentes} />
                    )}
                </div>
            </div>
        </div>
    );
};



export default Notifications;
