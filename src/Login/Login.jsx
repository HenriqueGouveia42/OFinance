import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth(); //Hook useAuth para obter a função login()
    const navigate = useNavigate(); //Hook useNavigate para navegação

    const handleSubmitLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/login',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if(!response.ok){
                const errorData = await response.json();
                alert("Login ou senha incorretos");
                alert(`Erro: ${errorData.message}`);
                return; //Interrompe o fluxo
            }
            const data = await response.json();
            //Se o login for bem sucedido, data.token carregará o token gerado pelo login
            login(data.token);
            alert("Login feito com sucesso!");
            navigate('/month');
        }catch(error){
            alert("Erro ao logar");
            console.error(error);
        }
    }
    return(
        <div className="bg-orange-400 w-screen h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmitLogin} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="Insira aqui o e-mail cadastrado"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="Insira aqui a senha"></input>
                <button type="submit" className="p-2 bg-slate-400 rounded-3xl mt-2 hover:shadow-2xl hover:bg-slate-600">Entrar</button>
            </form>
            <div>
                <h1>Ainda nao tem conta? Cadastre-se!</h1>
                <button 
                className="bg-slate-500 rounded-3xl p-2"
                onClick={()=>navigate("/signup")}
                >Cadastre-se</button>
            </div>
        </div>
    )
}

export default Login;