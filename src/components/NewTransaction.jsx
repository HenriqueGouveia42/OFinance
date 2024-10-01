import { FaArrowCircleLeft } from "react-icons/fa";
import Numpad from "./Numpad.jsx";
import TransactionDetails from "./TransactionDetails.jsx"
import { useState } from "react";

//visible, setVisible, handleVisibleClick:
//Define qual componente filho será renderizadoo: Numpad ou TransactionDetailss

//value, SetValue, valueReceivedFromNumPadtoNewTransaction
//Função que chama setValue será passada como prop ao componente filho Numpad para receber dele o dado 'value' via lifting-up-state

//details, setDetails, detailsReceivedFromTransactionDetailstoNewTransaction
//Função que chama setDetails será passada como prop ao componente filho Transaction Details para receber dele o objeto 'details' via lifting-up-state

//createUnifiedTransactionObject:
//Unifica em um único objeto o dado 'value', vindo do componente filho Numpad, e o objeto 'details', vindo do componente filho TransactionDetails, ambos via lifting-up-state
const NewTransaction = ({type}) => {

    const [detailsOrNumpad, setDetailsOrNumpad] = useState(false);
    const handleDetailsOrNumpadClick = () =>{
        setDetailsOrNumpad(prevValue => !prevValue)
    }

    const [value, setValue] = useState('0');
    const valueReceivedFromNumPadtoNewTransaction = (value) => {
        setValue(value);
    }

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

    const createUnifiedTransactionObject = () => {
        const unifiedObject = {
            value: parseFloat(value), //Converte para float o valor recebido via lifting-up-state de Numpad
            details : details //Inclui todos os detalhes
        }
        return unifiedObject
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
                                <h1 className="text-xs text-white">{type == 'revenue' ? 'Valor da receita' : 'Valor da despesa'}</h1>
                                <button className="text-lg text-white hover:cursor-pointer hover:bg-green-600"
                                onClick={()=>handleDetailsOrNumpadClick()}>
                                {((parseFloat(value))).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</button>
                            </div>
                    </div>
                </div>
                {/* Parte inferior do NewTransaction, que pode renderizar o NumPad, para inserir um novo valor, ou o TransactionDetails*/}
                <div className="flex flex-col w-full h-4/5 bg-white">
                    {/* Renderiza o componente Numpad */}
                    {detailsOrNumpad && <Numpad  valueReceivedFromNumPadtoNewTransaction={valueReceivedFromNumPadtoNewTransaction} detailsOrNumpad={handleDetailsOrNumpadClick}/> }
                    {/* Renderiza o componente TransactionDetails */}
                    {!detailsOrNumpad && <TransactionDetails detailsReceivedFromTransactionDetailstoNewTransaction={detailsReceivedFromTransactionDetailstoNewTransaction}/>}
                </div>
            </div>
        </>
    )
}
export default NewTransaction