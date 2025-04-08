import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Accounts = () => {
    const navigate = useNavigate();
    //const [accounts, setAccounts] = useState(null);
    const {userData, loading} = useAuth();

    if(loading || !userData){
        return <p>Carregando dados do usuario...</p>
    }

    var accounts = userData.accounts

        const RenderAccounts = ({accounts}) =>{
        if(accounts.lenght == 0){
            return <p>Nenhuma conta cadastrada!</p>
        }else{
            return accounts.map((account)=>(
                <li key={account.id}>
                    <div className="flex space-x-3 items-center">
                        <div>
                            SIMBOL
                        </div>
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
