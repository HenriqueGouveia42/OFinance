import { FaArrowCircleLeft } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { FaPaperclip } from "react-icons/fa6";
import { MdOutlinePushPin } from "react-icons/md";
import { FaRepeat } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { RiCoinsLine } from "react-icons/ri";


import Toggle from "./Toggle";
import Numpad from "./Numpad";
import DetailLine from "./DetailLine";
import RenderCategories from "./RenderCategories";
import RenderRepeatTypes from "./RenderRepeatTypes";
import RenderAccounts from "./RenderAccounts";
import RenderCurrencies from "./RenderCurrencies.jsx";
import Datepicker from "react-tailwindcss-datepicker"

import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { TransactionTypeContext } from "../contexts/TransactionTypeContext.jsx";

import { useNavigate } from "react-router-dom";

import LoadingWrapper from "../wrappers/LoadingWrapper.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const NewTransaction = () => {

    const navigate = useNavigate();

    const {fetchUserData} = useAuth();

    //Acessa o contexto
    const {transactionType} = useContext(TransactionTypeContext);

    //Objeto que armazena todos os detalhes de uma transação que será enviada ao backend
    const [details, setDetails] = useState({
        amount: 0,
        type: transactionType,
        paid_out: true,
        payDay: null,
        description: "",
        categoryId: null,
        accountId: null,
        currencyId: null,
        attachment: "",
        fixed: false,
        repeat: false,
        typeRepeat: null,
        remindMe: "",
    });

    const handleTransactionValueInput = (value) => {
        updateDetails('amount', parseFloat(value));
        handleIsNumpadVisible(); //Inverte o valor lógico de 'isNumpadVisible', fazendo Numpad 'sumir' e renderizar os detalhes da transação
    }

    const updateDetails = (field, value) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    }

    //Função generica que atualiza os campos de details, tenham eles nos inputs a propriedade 'target', ou seja, sendo eventos, ou sejam valores diretos.
    const updateDetailsField = (field) => (eventOrValue) =>{
        const value = (eventOrValue?.target) ? eventOrValue.target.value : eventOrValue
        updateDetails(field, value);
    }
    const handleInputDate = updateDetailsField('payDay');
    const handleInputDescription = updateDetailsField('description');
    const handleCategorySelected = updateDetailsField('categoryId');
    const handleAccountSelected = updateDetailsField('accountId');
    const handleCurrencySelected = updateDetailsField('currencyId');
    const handleTypeRepeatClick = updateDetailsField('typeRepeat')

    //Função que alterna entre renderizar o componente filho Numpad, que recebe e repassa o input numérico do usuário para o pai para o TransactionTypeContext
    const [isNumpadVisible, setIsNumpadVisible] = useState(true);
    const handleIsNumpadVisible = () =>{
        setIsNumpadVisible(prevValue => !prevValue)
    }

    const[more, setMore] = useState(false); //Estado especifico para UI
    const showMoreDetails = () =>{
        setMore((prev) => !prev);
    }

    //useEffect que esvazia 'typeRepeat' quando 'repeat' for false
    useEffect(() => {
        if (!details.repeat) {
            updateDetails('typeRepeat', '')
        }
    }, [details.repeat]);

    useEffect(()=>{
        updateDetails('type', transactionType);
    }, [transactionType]);

    const handleSubmit = async() =>{
        try{
            details.payDay.startDate = new Date(details.payDay.startDate).toISOString();
            details.payDay.endDate = new Date(details.payDay.endDate).toISOString();

            const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/create-transaction`, {
                method: 'POST',
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details), //Envia o objeto 'details' diretamente,
            })
            
            if(!response.ok){
                throw new Error(`Erro na resposta: ${response.status}`);
            }

            await fetchUserData();

            alert("Transacao criada com sucesso!");
            navigate("/month");

        }catch(error){
            console.error('Erro ao salvar os dados: ', error);
        }
    }

    return(
        <div className="bg-maingray w-4/5  rounded-3xl p-3 justify-items-center">
                <div className= "flex flex-col w-[30rem] overflow-x-hidden">
                    <div className={`flex flex-col h-1/5 max-w-full ${transactionType === 'revenue' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <div className="flex items-center">
                                {/*Se o componente filho Numpad estiver renderizado, 'isNumpadVisible' tem seu valor lógico invertido, fazendo 'Numpad' sumir e os detalhes da transação serem renderizados em seu lugar*/}
                                <button className="p-3"><FaArrowCircleLeft color="white" size="25"
                                    onClick={
                                        (e)=>{
                                            isNumpadVisible ? navigate("/month") : handleIsNumpadVisible();
                                            e.target.blur(); //Remove o foco do botão após o clique, essencial para evitara comportamentos inesperados
                                        }
                                    }
                                />
                                </button>
                                <h1 className="font-medium text-white">{transactionType == 'revenue' ? 'Nova receita' : 'Nova despesa'}</h1>
                            </div>
                        
                        <div className="flex items-center">
                                <div className="flex flex-col">
                                    <h1 className="text-xs text-white m-1">{transactionType == 'revenue' ? 'Valor da receita' : 'Valor da despesa'}</h1>
                                    <button className="flex items-center p-1 m-1 text-lg text-white hover:cursor-pointer hover:bg-green-600 rounded-2xl"
                                            onClick={(e)=>
                                            {   
                                                if (!isNumpadVisible) handleIsNumpadVisible();
                                                e.target.blur(); //Remove o foco do botão após o clique, essencial para evitara comportamentos inesperados
                                            }
                                            }> 
                                                {
                                                    ((parseFloat(details.amount))).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                                                }
                                                <FaRegEdit className="ml-4" size={20}/>
                                    </button>
                                </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-4/5 w-full bg-white">

                        {isNumpadVisible && <Numpad transactionValueInput={handleTransactionValueInput}/>}

                        {!isNumpadVisible &&
                            <div className="flex flex-col h-[30rem] justify-between overflow-y-scroll overflow-x-hidden">
                                <DetailLine 
                                    icon={<FaRegCheckCircle size={20} />}
                                    content={details.paid_out ?  <div className="text-xs">{transactionType === 'revenue' ? 'Recebido' : 'Pago'}</div>: <div className="text-xs">Pendente</div>}
                                    action={<Toggle toggleReceived={()=>updateDetails('paid_out', !details.paid_out)} state={details.paid_out} />}
                                />
                                    <Datepicker
                                        showShortcuts={true}
                                        asSingle={true}
                                        readOnly={true}
                                        useRange={false}
                                        value={details.payDay} 
                                        displayFormat="DD/MM/YYYY"
                                        popoverDirection="down"
                                        placeholder="Insira a data"
                                        onChange={newValue => handleInputDate(newValue)}
                                    />
                                <DetailLine
                                    icon={
                                        <button className="hover: cursor-pointer hover:bg-gray-400 hover: rounded-full"><MdKeyboardVoice size={20} /></button>
                                    }
                                    content={
                                        <input type="text"
                                            placeholder="Descrição" 
                                            value={details.description}
                                            onChange={handleInputDescription}>
                                        </input>
                                    }
                                    action={''} 
                                />
                                <DetailLine
                                    icon={<FaTag size={20}/>}
                                    content={
                                        <LoadingWrapper children={
                                            <RenderCategories
                                            type={transactionType}
                                            handleCategorySelected={handleCategorySelected}
                                            /> 
                                        }>
                                        </LoadingWrapper>                   
                                    }
                                    action={<CiCirclePlus size={30} onClick={()=>{
                                        navigate("/new-expense-or-revenue-type")
                                    }}/>}
                                />
                                <DetailLine
                                    icon={<CiWallet size={20}/>}
                                    content={
                                        <LoadingWrapper children={
                                            <RenderAccounts
                                                handleAccountSelected={handleAccountSelected}
                                            />
                                        }>
                                        </LoadingWrapper>
                                    }
                                    action={<CiCirclePlus size={30} onClick={()=>{
                                        navigate("/accounts")
                                    }}/>}
                                />
                                <DetailLine
                                    icon={<RiCoinsLine size={20}/>}
                                    content={
                                        <LoadingWrapper>
                                            <RenderCurrencies
                                                handleCurrencySelected={handleCurrencySelected}
                                            />
                                        </LoadingWrapper>
                                    }
                                    action={<CiCirclePlus size={30} onClick={()=>{
                                        navigate("/month")
                                    }}/>}
                                />
                                <DetailLine
                                    icon={<FaPaperclip size={20}/>}
                                    content={
                                        <button><label>Anexo</label></button>
                                    }
                                    action={<IoIosArrowForward size={20}/>}
                                />
                                <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600" 
                                    onClick={()=>showMoreDetails()}>
                                    <span>{more ? 'Menos Detalhes': 'Mais Detalhes'}</span>
                                </button>
                                {more &&
                                    <>
                                        <DetailLine
                                            icon={<MdOutlinePushPin size={20}/>}
                                            content={<span>{transactionType==='revenue' ? 'Receita ' : 'Despesa '}fixa</span>}
                                            action={<Toggle toggleReceived={()=>updateDetails('fixed', !details.fixed)} state={details.fixed} />}
                                        />
                                        <DetailLine
                                            icon={<FaRepeat size={20}/>}
                                            content={<span>Repetir</span>}
                                            action={<Toggle toggleReceived={()=>updateDetails('repeat', !details.repeat)} state={details.repeat} />}
                                        />
                                        {details.repeat &&
                                            <DetailLine
                                                icon={''}
                                                content={
                                                    <RenderRepeatTypes
                                                    handleTypeRepeatClick={handleTypeRepeatClick}
                                                    />
                                                }
                                                action={''}
                                            />
                                        }
                                        <DetailLine
                                            icon={<CiBellOn size={20}/>}
                                            content={<label>Lembrar-me</label>}
                                            action={<IoIosArrowForward size={20}/>}
                                        /> 
                                    </>
                                }
                                <form className="bg-slate-400 p-1 rounded-3xl m-2 text-center"
                                onSubmit={(e)=>{
                                    e.preventDefault();
                                    handleSubmit();
                                }}>
                                    <button
                                        type="submit"
                                        className="bg-slate-400 hover:bg-slate-600 h-full w-full  rounded-xl w-auto"
                                        disabled={false}
                                    >
                                        Enviar
                                    </button>
                                </form>
                                
                            </div>
                        }
                    </div>
                </div>
        </div>
    )
}
export default NewTransaction