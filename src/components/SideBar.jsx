import { BsCashCoin } from "react-icons/bs";
import { HiCreditCard } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import { useContext, useState } from "react";
import { TransactionTypeContext } from "../contexts/TransactionTypeContext";
import { useNavigate } from "react-router-dom";

const SideBar = () =>{

    const [newRevenueOrExpense, setNewRevenueOrExpense] = useState(false);
    const toggleNewRevenueOrExpense = () =>{
        setNewRevenueOrExpense((prevState) => !prevState);
    }
    const {handleTransactionType} = useContext(TransactionTypeContext);
    
    const navigate = useNavigate();

    const handleNavigateToNewTransaction = (type) =>{
        handleTransactionType(type);
        navigate("/newtransaction");
        toggleNewRevenueOrExpense();
    }
    return(
        <div className="fixed top-16 z-10 flex flex-col left-0 h-screen max-w-64  bg-primary text-secondary shadow-lg p-2">
            <div className="relative flex flex-col align-middle justify-center items-start space-y-8">
                <button className="icon" onClick={toggleNewRevenueOrExpense}>
                    <div className="flex items-center">
                        <div>
                            <CiCirclePlus size="30"/>
                        </div>
                        <div className="text-white ml-5 break-words text-xs">
                            <p>Nova receita/despesa</p>
                        </div>
                    </div>
                </button>
                {newRevenueOrExpense &&
                    <div className="absolute flex flex-col bottom-32 left-48 bg-white rounded-xl shadow-lg p-2 min-w-[10rem]">
                        <button className="text-sm hover:bg-gray-200 rounded p-1" onClick={() => {
                            handleNavigateToNewTransaction("revenue");
                            }}>Receita
                        </button>
                        <button className="text-sm hover:bg-gray-200 rounded p-1" onClick={() => {
                            handleNavigateToNewTransaction("expense");
                            }}>Despesa
                        </button>
                    </div>
                }
                <button className="icon" onClick={() => {navigate("/accounts")}}>
                    <div className="flex items-center">
                        <div>
                            <BsCashCoin size="30"/>
                        </div>
                        <div className="text-white ml-5 break-words text-xs">
                            <p>Contas</p>
                        </div>
                    </div>
                </button>
                <button className="icon" onClick={() => {navigate("/credit-cards")}}>
                    <div className="flex items-center">
                        <div>
                            <HiCreditCard size="30"/>
                        </div>
                        <div className="text-white ml-5 break-words text-xs">
                            <p>Cartões de Crédito</p>
                        </div>
                    </div>
                </button>
            </div>
            
        </div>
    )
}
export default SideBar