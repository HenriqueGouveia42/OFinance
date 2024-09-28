import Toggle from "./Toggle";

import { useState } from "react";


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

const DetailLine = ({ icon, content, action }) => {
    return (
        <>
            <button className="flex justify-between items-center rounded-md p-6 m-1 w-full">
                <div className="text-left">{icon}</div>
                <div className="text-center">{content}</div>
                <div className="text-right">{action}</div>
            </button>
            <hr />
        </>
    );
};


const TransactionDetails = () => {

    //Controle do estado do dia selecionado:
    const [selectedPayDay, setSelectedPayDay] = useState(null);
    const handlePayDayClick = (day) => {
        setSelectedPayDay(day);
    };

    //Objeto que guarda os estados booleanos inseridos pelo usuários, como "Recebido", "Mais - Exibir mais detalhes do formulário", "Fixo, "Repete"...
    //Os estados booleanos deste componente react serão todos acessado por meio deste objeto
    const [settings, setSettings] = useState({
        received: true,
        more: false,
        fixed: false,
        repeat: false,
    })
    
    
    //Função que chama o setSettings e atualiza o valor atual para o valor lógico oposto - !

    //...prev é DESESTRUTURACAO => Pega todas as propriedades do objeto prev e copia isso para um novo objeto
        //Exemplo:
            //const prev = { received: true, more: false };
            //const newObj = { ...prev }; 
            // newObj agora é { received: true, more: false } (cópia de prev)
    const toggleSettings = (key) => {
        setSettings(prev => ({...prev, [key]: !prev[key]}))
    }

    return (
        <div className="grid grid-cols-1 gap-y-2 w-full h-96 overflow-y-auto">
            <DetailLine 
                icon={<FaRegCheckCircle size={20} />} 
                content={settings.received ?  <div className="text-xs">Recebido</div>: <div className="text-xs">Não recebido</div>} 
                action={<Toggle toggleReceived={()=>toggleSettings('received')} state={settings.received} />} 
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
                action={''}s
            />
            <DetailLine
                icon={
                    <button className="hover: cursor-pointer hover:bg-gray-400 hover: rounded-full"><MdKeyboardVoice size={20} /></button>
                }
                content={
                    <input type="text" placeholder="Descrição"></input>
                }
                action={''} />
            <DetailLine
                icon={<FaTag size={20}/>}
                content={
                    <button className="flex items-center justify-center rounded-2xl bg-slate-300 p-1 hover:cursor-pointer">
                        <label className="hover:cursor-pointer">
                            Categoria 1
                        </label>  
                    </button>
                }
                action={<IoIosArrowForward size={20}/>}
            />
            <DetailLine
                icon={<CiWallet size={20}/>}
                content={
                    <button className="flex items-center justify-center rounded-2xl bg-slate-300 p-1 hover:cursor-pointer">
                        <label className="hover:cursor-pointer">Conta 1</label>  
                    </button>
                }
                action={<IoIosArrowForward size={20}/>}
            />
            <DetailLine
                icon={<FaPaperclip size={20}/>}
                content={
                    <label>Anexo</label>
                }
                action={<IoIosArrowForward size={20}/>}/>
            {settings.more ?
                <>
                    <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600" onClick={()=>toggleSettings('more')}><label>Menos Detalhes</label></button>
                    <DetailLine
                        icon={<MdOutlinePushPin size={20}/>}
                        content={<label>Receita fixa</label>}
                        action={<Toggle toggleReceived={()=>toggleSettings('fixed')} state={settings.fixed} />}
                    />
                    <DetailLine
                        icon={<FaRepeat size={20}/>}
                        content={<label>Repetir</label>}
                        action={<Toggle toggleReceived={()=>toggleSettings('repeat')} state={settings.repeat} />}
                    />
                    {settings.repeat && 
                        <DetailLine
                            icon={''}
                                content={
                                    <ul className="flex flex-col border border-black border-1">
                                        <li className="recurrency-type"><button>Todos os dias</button></li>
                                        <li className="recurrency-type"><button>Semanal</button></li>
                                        <li className="recurrency-type"><button>Mensal no(a) primeiro(a) dia</button></li>
                                        <li className="recurrency-type"><button>Anual em (dia)</button></li>
                                        <li className="recurrency-type"><button>Todos os dias da semana</button></li>
                                        </ul>
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
                :
                <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600" onClick={()=>toggleSettings('more')}><label>Mais detalhes</label></button>}
        </div>
    );
};

export default TransactionDetails;
