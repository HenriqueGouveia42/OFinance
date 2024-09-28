import { useState } from "react";
import Toggle from "./Toggle";

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
    const [received, setReceived] = useState(false);
    const toggleReceived = () => {
        setReceived((prev) => !prev);
    };

    const [selectedDay, setSelectedDay] = useState(null);
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const [more, setMore] = useState(false);
    const handleMoreClick = () =>{
        setMore(prev => !prev)
    }

    const [fixed, setFixed] = useState(false);
    const handleFixedClick = () =>{
        setFixed(prev => !prev)
    }

    const [repeat, setRepeat] = useState(false);
    const handleRepeatClick = () =>{
        setRepeat(prev => !prev)
    }

    return (
        <div className="grid grid-cols-1 gap-y-2 w-full h-96 overflow-y-auto">
            <DetailLine 
                icon={<FaRegCheckCircle size={20} />} 
                content={received ?  <div className="text-xs">Recebido</div>: <div className="text-xs">Não recebido</div>} 
                action={<Toggle toggleReceived={toggleReceived} state={received} />} 
            />
            <DetailLine
                icon={<CiCalendarDate size={20}/>                }
                content={
                    <div className="flex items-center space-x-2">
                        <button className={`day-icon ${selectedDay === 'hoje' ? 'bg-green-900' : 'bg-green-600 '}`} onClick={() => handleDayClick('hoje')}>Hoje</button>
                        <button className={`day-icon ${selectedDay === 'ontem' ? 'bg-green-900' : 'bg-green-600 '}`} onClick={() => handleDayClick('ontem')}>Ontem</button>
                        <button className={`day-icon ${selectedDay === 'outros' ? 'bg-green-900' : 'bg-green-600 '}`} onClick={() => handleDayClick('outros')}>Outros</button>
                    </div>
                }
                action={''}
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
            <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600" onClick={handleMoreClick}>{
                more ? <label>Menos detalhes</label> : <label>Mais detalhes</label>
            }</button>
            {more ? 
                <>
                    <DetailLine
                        icon={<MdOutlinePushPin size={20}/>}
                        content={<label>Receita fixa</label>}
                        action={<Toggle toggleReceived={handleFixedClick} state={fixed} />}
                    />
                    <DetailLine
                        icon={<FaRepeat size={20}/>}
                        content={<label>Repetir</label>}
                        action={<Toggle toggleReceived={handleRepeatClick} state={repeat} />}
                    />
                    <DetailLine
                        icon={<CiBellOn size={20}/>}
                        content={<label>Lembrar-me</label>}
                        action={<IoIosArrowForward size={20}/>}
                    />
                </>
                :
                    <></>
            }
        </div>
    );
};

export default TransactionDetails;
