import { FaArrowCircleLeft } from "react-icons/fa";
import Numpad from "./Numpad.jsx";
import TransactionDetails from "./TransactionDetails.jsx"
import { useState } from "react";

const NewTransaction = ({type}) => {

    const [visible, setVisible] = useState(false);
    const handleVisibleClick = () =>{
        setVisible(prevValue => !prevValue)
    }

    //Armazena o valor de input do usuario que vem do componente filho Numpad através de "lifting-up-state"
    const [value, setValue] = useState('0');
    const valueReceivedFromNumPadtoNewTransaction = (value) => {
        setValue(value)
    }

    //Armazena os detalhes da transação do usuário que virão do componente filho TransactionDetails através de "lifting-up-state"
    const [details, setDetails] = useState({
        received: false,
        more: false,
        fixed: false,
        repeat: false,
        typeRepeat: "",
        selectedPayDay: null
    });
    const detailsReceivedFromTransactionDetailstoNewTransaction = (newDetails) => {
        setDetails({
            ...details,     // Copia as propriedades do estado anterior (details)
            ...newDetails   // Sobrescreve ou adiciona as propriedades vindas de newDetails
        })
    }
    
    return(
        <>
            <div className= "flex flex-col w-[20rem]">
                {/* Parte superior do NewTransaction, que pode ser verde, se for uma nova receita, ou vermelho, se for uma nova despesa*/}
                <div className={`flex flex-col w-full h-1/5 ${type === 'revenue' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <div className="flex items-center">
                            <button className="p-3 rounded-3xl hover:cursor-pointer"><FaArrowCircleLeft color="white" size="25"/></button>
                            <h1 className="font-medium text-white">{type == 'revenue' ? 'Nova receita' : 'Nova despesa'}</h1>
                        </div>
                    <div className="flex items-center">
                            <div className="flex flex-col">
                                <h1 className="text-xs text-white">{type == 'revenue' ? 'Valor da receita' : 'Valro da despesa'}</h1>
                                <button className="text-lg text-white hover:cursor-pointer hover:bg-green-600"
                                onClick={()=>handleVisibleClick()}>
                                {((parseFloat(value))).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</button>
                            </div>
                    </div>
                </div>
                {/* Parte inferior do NewTransaction, que pode renderizar o NumPad, para inserir um novo valor, ou o TransactionDetails*/}
                <div className="flex flex-col w-full h-4/5 bg-white">
                    {/* Renderiza o componente Numpad */}
                    {visible && <Numpad  valueReceivedFromNumPadtoNewTransaction={valueReceivedFromNumPadtoNewTransaction}/> }
                    {/* Renderiza o componente TransactionDetails */}
                    {!visible && <TransactionDetails detailsReceivedFromTransactionDetailstoNewTransaction={''}/>}
                </div>
            </div>
            {console.log(value)}
        </>
    )
}
export default NewTransaction