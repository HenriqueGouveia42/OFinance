import { IoMenuOutline } from "react-icons/io5";
import { IoIosExit } from "react-icons/io";
import erplogo from "../assets/images/ofinancelogo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const HeaderIcon = ( { icon } ) => (
    <button className="header-icon">
        {icon}
    </button>
); 
const Header = () =>{

    const {logout, userData} = useAuth();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    
    return(
        <div className=" fixed top-0 left-0 z-10 bg-primary h-16 w-full text-white flex items-center justify-between">
            <div className="ml-7 flex items-center pl-2" onClick={() =>{
                navigate("/month");
            }}>
                <HeaderIcon icon={<IoMenuOutline size="24"/>}/>
                <img src={erplogo} className="ml-5" />
            </div>
            <p>{`Bem vindo, ${(userData ? userData.name : null)}`}</p>
            <button className="flex items-center hover:bg-slate-400 hover: rounded-3xl mr-10" onClick={()=>logout()}>
                <IoIosExit size={"50"}/>
                <p>Sair</p>
            </button>
        </div>
    )
}
export default Header


