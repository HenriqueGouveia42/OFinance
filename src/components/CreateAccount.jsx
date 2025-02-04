import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CreateAccount = () =>{
    const navigate = useNavigate();

    
    const handleSubmit = (event)=>{
        event.preventDefaul();
        
        const token = localStorage.getItem("token");
        if(!token){
            alert("Token nao encontrado!");
            return;
        }
        navigate("/accounts")
    }
    return(
        <div className="w-4/5 h-4/5 bg-maingray rounded-3xl p-3">
            <div className="flex space-x-5 items-center text-white">
                <button
                className="hover:bg-slate-400 rounded-full p-1"
                onClick={()=>navigate("/accounts")}
                >
                    <FaArrowLeftLong size={30}/>
                </button>
                <h2>Nova conta</h2>
            </div>
            <form className="flex flex-col items-center">
                <input className="rounded-3xl p-2" type="text" placeholder="Nome da nova conta"/>
                <button className="bg-cyan-600 rounded-3xl w-36 p-2 mt-6" type="submit" onClick={()=>handleSubmit()}>Criar nova conta</button>
            </form>
        </div>
    )
}
export default CreateAccount