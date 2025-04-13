import { useState, useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
 

const CreateAccount = () =>{

    const navigate = useNavigate();

    const { fetchUserData } = useAuth()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const createAcc = await fetch('http://localhost:5000/accounts/create-account',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({accountName}),
            credentials: 'include', //Permite cookies HTTP-Only
        })
        if(createAcc.ok){
            await fetchUserData();
            alert("Conta criada com sucesso");
        }else{
            alert("Não foi possivel criar a conta");
        }
    }

    const handleInputChange = (e) =>{
        setAccountName(e.target.value)
    }

    const [accountName, setAccountName] = useState(null);

    return(
        <div className="bg-maingray w-4/5 h-4/5 rounded-3xl p-3 justify-items-center space-y-4">
            {console.log(accountName)}
            <button><FaArrowLeftLong  className="bg-white rounded-full p-1 hover:bg-slate-200" size={30} onClick={()=>navigate("/accounts")}/></button>
            <p>Insira o nome da conta</p>
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome da conta" onChange={handleInputChange}></input>
                <button type="submit" className="bg-blue-500 rounded-full p-1">Criar conta</button>
            </form>
        </div>
    )
}
export default CreateAccount