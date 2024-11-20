//Icones
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
//Componentes filhos
import Toggle from "./Toggle";
import Numpad from "./Numpad";
import DetailLine from "./DetailLine";
import RenderCategories from "./RenderCategories";
import RenderRepeatTypes from "./RenderRepeatTypes";
import RenderAccounts from "./RenderAccounts";
import Datepicker from "react-tailwindcss-datepicker"
//Hooks
import { useState } from "react";
import { useEffect } from "react";

const NewTransaction = ({type}) => {

    //Objeto javascript que armazena todos os detalhes de uma transação que será enviada ao backend
    const [details, setDetails] = useState({
        user_id: null,
        currency: 'BRL',
        status: null,
        type: type,
        value: 0,
        received: true,
        selectedPayDay: null,
        description: '',
        category: '',
        account_id: '',
        account: '',
        attachment: null,
        fixed: false,
        repeat: false,
        typeRepeat: '',
        remindMe: false
    });
    //Atualiza os valores do objeto details  
    const updateDetails = (field, value) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    }
    //Função generica que atualiza os campos de details, tenham os inputs a propriedade 'target', ou sseja, sendo eventos, ou sejam valores diretos.
    //Extrai o valor do campo se o parâmetro for um evento. (value = eventOrValue.target.value)
    //Usa o valor diretamente se for passado como argumento. (value = eventOrValue)
    const updateDetailsField = (field) => (eventOrValue) =>{
        const value = (eventOrValue?.target) ? eventOrValue.target.value : eventOrValue
        updateDetails(field, value);
    }
    const handleInputDate = updateDetailsField('selectedPayDay');
    const handleInputDescription = updateDetailsField('description');
    const handleCategorySelected = updateDetailsField('category');
    const handleAccountSelected = updateDetailsField('account');
    const handleTypeRepeatClick = updateDetailsField('typeRepeat')

    //Função que alterna entre renderizar o componente filho Numpad, que recebe e repassa o input numérico do usuário para o pai via lifting-up-state, ou os detalhes da transação
    const [isNumpadVisible, setIsNumpadVisible] = useState(true);
    const handleIsNumpadVisible = () =>{
        setIsNumpadVisible(prevValue => !prevValue)
    }
    const handleTransactionValueInput = (value) => {
        updateDetails('value', value)
        handleIsNumpadVisible(); //Inverte o valor lógico de 'isNumpadVisible', fazendo Numpad 'sumir' e renderizar os detalhes da transação
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
                                    onClick={
                                        (e)=>{
                                            if (isNumpadVisible) handleIsNumpadVisible();
                                            e.target.blur(); //Remove o foco do botão após o clique, essencial para evitara comportamentos inesperados
                                        }
                                    }
                                />
                                </button> {/* Botão só leva a renderizar o TransactionDetails se o componente Numpad estiver renderizado*/}
                                <h1 className="font-medium text-white">{type == 'revenue' ? 'Nova receita' : 'Nova despesa'}</h1>
                            </div>
                        
                        <div className="flex items-center">
                                <div className="flex flex-col">
                                    <h1 className="text-xs text-white m-1">{type == 'revenue' ? 'Valor da receita' : 'Valor da despesa'}</h1>
                                    <button className="flex items-center p-1 m-1 text-lg text-white hover:cursor-pointer hover:bg-green-600 rounded-2xl"
                                            onClick={(e)=>
                                            {   
                                                if (!isNumpadVisible) handleIsNumpadVisible();
                                                e.target.blur(); //Remove o foco do botão após o clique, essencial para evitara comportamentos inesperados
                                            }
                                            }> 
                                                {
                                                    ((parseFloat(details.value))).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                                                }
                                                <FaRegEdit className="ml-4" size={20}/>
                                    </button>
                                    {console.log(details)}
                                </div>
                        </div>
                    </div>
                    {/* Parte inferior do NewTransaction, que pode renderizar o componente filho NumPad, para inserir um novo valor, ou os demais elementos para inserir os deatalhes da transação*/}
                    <div className="flex flex-col w-full h-4/5 bg-white">
                        {/* Renderiza o componente filho Numpad */}
                        {isNumpadVisible && <Numpad transactionValueInput={handleTransactionValueInput}/>}
                        {/* Input dos detalhes da transação*/}
                        {!isNumpadVisible &&
                            <div className="flex flex-col h-80 justify-between overflow-y-scroll">
                                <DetailLine 
                                    icon={<FaRegCheckCircle size={20} />}
                                    content={details.received ?  <div className="text-xs">{type === 'revenue' ? 'Recebido' : 'Pago'}</div>: <div className="text-xs">Pendente</div>}
                                    action={<Toggle toggleReceived={()=>updateDetails('received', !details.received)} state={details.received} />}
                                />
                                <Datepicker
                                    showShortcuts={true}
                                    asSingle={true}
                                    readOnly={true}
                                    useRange={false}
                                    value={details.selectedPayDay} 
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
                                    onClick={()=>showMoreDetails()}>
                                    <span>{more ? 'Menos Detalhes': 'Mais Detalhes'}</span>
                                </button>
                                {more &&
                                    <>
                                        <DetailLine
                                            icon={<MdOutlinePushPin size={20}/>}
                                            content={<span>{type==='revenue' ? 'Receita ' : 'Despesa '}fixa</span>}
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
                                <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600">Enviar</button>
                            </div>
                            
                        }
                    </div>
                </div>
            }
        </>
    )
}
export default NewTransaction