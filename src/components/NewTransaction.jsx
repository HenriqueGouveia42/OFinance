//Icones
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaTag } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { FaPaperclip } from "react-icons/fa6";
import { MdOutlinePushPin } from "react-icons/md";
import { FaRepeat } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
//Componentes filhos
import Toggle from "./Toggle";
import Numpad from "./Numpad";
import DetailLine from "./DetailLine";
import RenderCategories from "./RenderCategories";
import RenderRepeatTypes from "./RenderRepeatTypes";
import RenderAccounts from "./RenderAccounts";

import { useState } from "react";
import { useEffect } from "react";

const NewTransaction = ({type}) => {

    //Função que alterna entre renderizar o componente filho Numpad, que recebe e repassa o input numérico do usuário para o pai via lifting-up-state, ou os detalhes da transação
    const [isNumpadVisible, setIsNumpadVisible] = useState(true);
    const handleIsNumpadVisible = () =>{
        setIsNumpadVisible(prevValue => !prevValue)
    }

    // handleTransactionValueInput é passada como prop ao componente filho Numpad a fim de receber o valor inserido pelo usuário via lifting-up-state
    const [transactionValue, setTransactionValue] = useState('0');
    const handleTransactionValueInput = (value) => {
        setTransactionValue(value);
        handleIsNumpadVisible(); //Inverte o valor lógico de 'isNumpadVisible', fazendo Numpad 'sumir' e renderizar os detalhes da transação
    }

    //Objeto javascript que armazena todos os detalhes de uma transação que será enviada ao backend
    const [details, setDetails] = useState({
        type: type,
        value: transactionValue,
        received: true,
        selectedPayDay: null,
        description: '',
        category: '',
        account: '',
        attachment: null,
        more: false,
        fixed: false,
        repeat: false,
        typeRepeat: '',
        remindMe: false
    });

    //Inverte o valor lógico de atributos booleanos como 'received', 'more', 'fixed'...
    const toggleDetails = (key) => {
        setDetails(prev => ({...prev, [key]: !prev[key]}))
    }

    //Define o dia de pagamento. 'Hoje', 'Ontem' ou 'Outros' 
    const [selectedPayDay, setSelectedPayDay] = useState(null);
    const handlePayDayClick = (day) => {
        setSelectedPayDay(day);
    };

    //Armazena a descrição de texto
    const [description, setDescription] = useState('');
    const handleInputDescription = (e) =>{
        const value = e.target.value;
        setDetails(prev => ({
            ...prev,
            description: value
        }));
    }

    //Armazena e altera a categoria selecionada pelo usuário, seja de receita ou de despesa. 
    //'categorySelected', 'setCategory' e 'handleCategorySelected' serão passados como props ao componente filho
    //RenderCategories, que será responsável por renderizar a lista de categorias cadastradas pelo usuário e alterar 'categorySelected'
    //via lifting-up-state
    const [categorySelected, setCategorySelected] = useState(null);
    const handleCategorySelected = (value) =>{
        setCategorySelected(value);
    }

    //Armazena e altera a conta selecionada pelo usuário, seja de receita ou de despesa.
    //'accountSelected', 'setAccount' e 'handleAccountSelected' serão passados como props ao componente filho
    //RenderAccounts, que será responsável por renderizar a lista de contas cadastradas pelo usuário e alterar 'accountSelected'
    const [accountSelected, setAccountSelected] = useState(null);
    const handleAccountSelected = (value) =>{
        setAccountSelected(value)
    }

    const [typeRepeat, setTypeRepeat] = useState(null);
    const handleTypeRepeatClick = (key) => {
        setTypeRepeat(key)
    }

    //useEffect que esvazia 'typeRepeat' quando 'repeat' for false
    useEffect(() => {
        if (!details.repeat) {
            setTypeRepeat('');
        }
    }, [details.repeat]);

    return(
        <>
            {(type === 'revenue' || type ==='expense') &&
                <div className= "flex flex-col w-[20rem]">
                    {/*Parte superior do NewTransaction, que pode ser verde, se for uma nova receita, ou vermelho, se for uma nova despesa*/}
                    {/*Possui um botão para renderizar o componente filho Numpad*/}
                    <div className={`flex flex-col w-full h-1/5 ${type === 'revenue' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <div className="flex items-center">
                                {/*Se o componente filho Numpad estiver renderizado, 'isNumpadVisible' tem seu valor lógico invertido, fazendo 'Numpad' sumir e os detalhes da transação serem renderizados em seu lugar*/}
                                <button className="p-3"><FaArrowCircleLeft color="white" size="25"
                                    onClick={()=>isNumpadVisible && handleIsNumpadVisible()}
                                />
                                </button> {/* Botão só leva a renderizar o TransactionDetails se o componente Numpad estiver rendizado*/}
                                <h1 className="font-medium text-white">{type == 'revenue' ? 'Nova receita' : 'Nova despesa'}</h1>
                            </div>
                        <div className="flex items-center">
                                <div className="flex flex-col">
                                    <h1 className="text-xs text-white m-1">{type == 'revenue' ? 'Valor da receita' : 'Valor da despesa'}</h1>
                                    <button className="flex items-center p-1 m-1 text-lg text-white hover:cursor-pointer hover:bg-green-600 rounded-2xl"
                                            onClick={()=>!isNumpadVisible && handleIsNumpadVisible()}> {/* Botão só leva a renderizar o componente Numpad e o TransactionDetails estiver rendizado*/}
                                            {((parseFloat(transactionValue))).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                                            <FaRegEdit className="ml-4" size={20}/>
                                    </button>
                                </div>
                        </div>
                    </div>
                    {/* Parte inferior do NewTransaction, que pode renderizar o NumPad, para inserir um novo valor, ou o TransactionDetails, para inserir os deatlhes da transação*/}
                    <div className="flex flex-col w-full h-4/5 bg-white">
                        {/* Renderiza o componente filho Numpad */}
                        {isNumpadVisible && <Numpad transactionValueInput={handleTransactionValueInput}/>}
                        {/* Input dos detalhes da transação*/}
                        {!isNumpadVisible && 
                            <div className="flex flex-col h-80 justify-between overflow-y-scroll">
                                <DetailLine 
                                    icon={<FaRegCheckCircle size={20} />}
                                    content={details.received ?  <div className="text-xs">{type === 'revenue' ? 'Recebido' : 'Pago'}</div>: <div className="text-xs">Pendente</div>}
                                    action={<Toggle toggleReceived={()=>toggleDetails('received')} state={details.received} />}
                                />
                                <DetailLine
                                    icon={<CiCalendarDate size={20}/>                }
                                    content={
                                    <div className="flex items-center space-x-2">
                                        <button className={`day-icon ${selectedPayDay === 'hoje' ? 'bg-green-900 hover:shadow-2xl' : 'bg-green-600 '}`} aria-label onClick={() => handlePayDayClick('hoje')}>Hoje</button>
                                        <button className={`day-icon ${selectedPayDay === 'ontem' ? 'bg-green-900 hover:shadow-2xl' : 'bg-green-600 '}`} aria-label onClick={() => handlePayDayClick('ontem')}>Ontem</button>
                                        <button className={`day-icon ${selectedPayDay === 'outros' ? 'bg-green-900 hover:shadow-2xl' : 'bg-green-600 '}`} aria-label onClick={() => handlePayDayClick('outros') }>Outros</button>
                                            {selectedPayDay=='outros' &&
                                                <>CALENDARIO</>
                                            }
                                    </div> 
                                    }
                                    action={''}
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
                                        <RenderCategories
                                        type={type}
                                        handleCategorySelected={handleCategorySelected}
                                        />                    
                                    }
                                    action={<IoIosArrowForward size={20}/>}
                                />
                                <DetailLine
                                    icon={<CiWallet size={20}/>}
                                    content={
                                        <RenderAccounts
                                        handleAccountSelected={handleAccountSelected}
                                        />
                                    }
                                    action={<IoIosArrowForward size={20}/>}
                                />
                                <DetailLine
                                    icon={<FaPaperclip size={20}/>}
                                    content={
                                        <button><label>Anexo</label></button>
                                    }
                                    action={<IoIosArrowForward size={20}/>}
                                />
                                <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600" 
                                    onClick={()=>toggleDetails('more')}>
                                    <span>{details.more ? 'Menos Detalhes': 'Mais Detalhes'}</span>
                                </button>
                                {details.more &&
                                    <>
                                        <DetailLine
                                            icon={<MdOutlinePushPin size={20}/>}
                                            content={<span>{type==='revenue' ? 'Receita ' : 'Despesa '}fixa</span>}
                                            action={<Toggle toggleReceived={()=>toggleDetails('fixed')} state={details.fixed} />}
                                        />
                                        <DetailLine
                                            icon={<FaRepeat size={20}/>}
                                            content={<span>Repetir</span>}
                                            action={<Toggle toggleReceived={()=>toggleDetails('repeat')} state={details.repeat} />}
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
                            </div>
                            
                        }
                    </div>
                </div>
            }
        </>
    )
}
export default NewTransaction