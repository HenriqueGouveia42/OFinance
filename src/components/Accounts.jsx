import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate} from "react-router-dom";

const Accounts = () => {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState(null);

    const getAccounts = async() =>{
        try{
            const response = await fetch('http://localhost:5000/accounts/get-accounts',{
                method: 'GET',
                credentials: 'include', //Permite o envio de cookies Http Only
            })
            if(response.ok){
                const data = await response.json();
                setAccounts(data);
            }else{
                console.error("Erro ao buscar as contas do usuario");
            }
        }catch(error){
            console.error("Erro ao recuperar contas do usuario");
        }
    }
    useEffect(()=>{
        getAccounts();
    }, []);

    const RenderAccounts = ({accounts}) =>{
        if(accounts.lenght == 0){
            return <p>Nenhuma conta cadastrada!</p>
        }else{
            return accounts.map((account)=>(
                <li key={account.id}>
                    <div className="flex space-x-3 items-center">
                        <icon>
                            SIMBOL
                        </icon>
                        <div className="flex flex-col">
                            <div className="text-white">{account.name}</div>
                            <div className={`${account.balance >= 0 ? "text-green-600" : "text-red-600"}`}>{account.balance.toLocaleString('pt-Br', {style: 'currency', currency: 'BRL'})}</div>
                        </div>
                    </div>
                </li>
            ))
        }
    }
    return(
        <div className="bg-maingray w-4/5 h-4/5 rounded-3xl p-3 justify-items-center">
            <button><FaArrowLeftLong  className="bg-white rounded-full p-1 hover:bg-slate-200" size={30} onClick={()=>navigate("/month")}/></button>
            <div className="bg-[#393943] p-2 rounded-xl justify-items-start">
                <h1 className="font-bold">Contas</h1>
                <ul className="flex flex-col space-y-1">
                    {
                        !accounts ?
                        <p>Carregando...</p>
                        :
                        <RenderAccounts accounts={accounts}/>
                    }
                </ul>
            </div>
            <button onClick={()=>navigate("/create-account")}>Criar nova conta</button>
            
        </div>
    )
}
export default Accounts
