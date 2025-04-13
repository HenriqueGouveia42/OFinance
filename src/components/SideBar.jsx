import { BsCashCoin } from "react-icons/bs";
import { HiCreditCard } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import { GiWallet } from "react-icons/gi";
import { useContext, useState } from "react";
import { TransactionTypeContext } from "../contexts/TransactionTypeContext";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const [newRevenueOrExpense, setNewRevenueOrExpense] = useState(false);
    const toggleNewRevenueOrExpense = () => {
        setNewRevenueOrExpense((prevState) => !prevState);
    };

    const { handleTransactionType } = useContext(TransactionTypeContext);
    const navigate = useNavigate();

    const handleNavigateToNewTransaction = (type) => {
        handleTransactionType(type);
        navigate("/newtransaction");
        toggleNewRevenueOrExpense();
    };

    return (
        <div className="fixed top-16 left-0 z-10 h-screen max-w-64 bg-primary text-secondary shadow-lg p-2">
            <div className="flex flex-col space-y-8">
                {/* Botão para Nova Receita/Despesa */}
                <button className="icon" onClick={toggleNewRevenueOrExpense}>
                    <div className="flex items-center">
                        <CiCirclePlus size="30" />
                        <span className="ml-5 text-white text-xs break-words">
                            Nova receita/despesa
                        </span>
                    </div>
                </button>

                {/* Submenu de Receita ou Despesa */}
                {newRevenueOrExpense && (
                    <div className="absolute bottom-32 left-48 bg-white rounded-xl shadow-lg p-2 min-w-[10rem]">
                        <button 
                            className="text-sm hover:bg-gray-200 rounded p-1" 
                            onClick={() => handleNavigateToNewTransaction("revenue")}
                        >
                            Receita
                        </button>
                        <button 
                            className="text-sm hover:bg-gray-200 rounded p-1" 
                            onClick={() => handleNavigateToNewTransaction("expense")}
                        >
                            Despesa
                        </button>
                    </div>
                )}

                {/* Botão para Contas */}
                <button className="icon" onClick={() => navigate("/accounts")}>
                    <div className="flex items-center">
                        <BsCashCoin size="30" />
                        <span className="ml-5 text-white text-xs break-words">Contas</span>
                    </div>
                </button>

                {/* Botão para Categorias de Receitas e Despesas */}
                <button className="icon" onClick={() => navigate("/categories")}>
                    <div className="flex items-center">
                        <GiWallet size="30" />
                        <span className="ml-5 text-white text-xs break-words">
                            Categorias de receitas e depesas
                        </span>
                    </div>
                </button>

                {/* Botão para Cartões de Crédito */}
                <button className="icon" onClick={() => navigate("/credit-cards")}>
                    <div className="flex items-center">
                        <HiCreditCard size="30" />
                        <span className="ml-5 text-white text-xs break-words">
                            Cartões de Crédito
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SideBar;
