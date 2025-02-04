import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
    const navigate = useNavigate();
    return(
        <div className="bg-maingray w-4/5 h-4/5 rounded-3xl p-3 justify-items-center">
            <button><FaArrowLeftLong  className="bg-white rounded-full p-1 hover:bg-slate-200" size={30} onClick={()=>navigate("/month")}/></button>
            <div className="bg-blue-400 p-2 rounded-xl">
                <h1 className="font-bold">Contas cadastrada</h1>
                <ul className="flex flex-col items-center">
                    <li className="">
                        Acc1
                    </li>
                    <li>
                        Acc2
                    </li>
                </ul>
            </div>
            <div className="w-4/5 h-4/5  p-3 justify-items-center">
                <h2>Nova conta</h2>
                <form className="flex flex-col items-center">
                    <input className="rounded-3xl p-2" type="text" placeholder="Nome da nova conta"/>
                    <button className="bg-cyan-600 rounded-3xl w-36 p-2 mt-6" type="submit" onClick={()=>alert("Bro")}>Criar nova conta</button>
                </form>
            </div>
        </div>
    )
}
export default Accounts
