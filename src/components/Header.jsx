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

    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const {logout} = useAuth();

    useEffect(()=>{
        const fetchUserData = async() =>{
            try{
                const response = await fetch("http://localhost:5000/auth/login/status", {
                    method: "GET",
                    credentials: 'include', //Permite o envio de cookies HTTP-only
                })
                if(response.ok){
                    const data = await response.json();
                    console.log("Dados recebidos: ", data);
                    setUsername(data.decoded.name);
                }else{
                    console.error("Erro ao buscar usuario autenticado: ", error);
                }
            }catch(error){
                console.error("Erro ao buscar o usuario autenticado: ", error);
            };
        }
            fetchUserData();
        
    }, []); //Array de dependências vazio para evitar chamadas infinitas
    return(
        <div className=" fixed top-0 left-0 z-10 bg-primary h-16 w-full text-white flex items-center justify-between">
            <div className="ml-7 flex items-center pl-2" onClick={() =>{
                navigate("/month");
            }}>
                <HeaderIcon icon={<IoMenuOutline size="24"/>}/>
                <img src={erplogo} className="ml-5" />
            </div>
            <p>{`Bem vindo, ${username}`}</p>
            <button className="flex items-center hover:bg-slate-400 hover: rounded-3xl mr-10" onClick={()=>logout()}>
                <IoIosExit size={"50"}/>
                <p>Sair</p>
            </button>
        </div>
    )
}
export default Header


