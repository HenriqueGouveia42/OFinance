import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyCode from "./VerifyCode";

const SignUp = () => {
// Estados para rastrear os valores dos campos
const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [verifyCode, setVerifyCode] = useState(false);
const toggleVerifyCode = () =>{
    setVerifyCode((prev) => !prev);
}

const navigate = useNavigate(); //Hook useNavigate para navegação

const validateForm = () => {
    if (!email) {
        alert("Por favor insira um email");
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Por favor, insira um email valido!");
        return false;
    }

    if (!name) {
        alert("Por favor insira seu nome!");
        return false;
    }

    if (password.length < 6) {
        alert("Senha deve ter no minimo 6 caracteres!");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Senhas nao coincidem!");
        return false;
    }
        return true;
    };


    const handleSubmitSignUp = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão (recarregar a página)
    if (validateForm()) {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`,
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        password,
                    }),
                }
            );
            if(response.status === 201){
                alert('Codigo enviado por e-mail!');
                toggleVerifyCode();
            }else{
                const errorData = await response.json();
                alert(`Erro: ${errorData.message}`);
            }
            
        }catch(error){
            console.error("Erro ao cadastrar: ", error);
            alert("Erro de rede. Tente novamente mais tarde!");
        }
    }
};

    return (
        <div className="bg-orange-400 w-screen h-screen flex flex-col items-center justify-center">
            {verifyCode ?
                <VerifyCode email={email}/>
            :
                <div className="flex flex-col bg-green-300 p-4 rounded-3xl font-semibold">
                <p>Crie sua conta e use o controlador financeiro Ofinance!</p>
                <form className="flex flex-col" onSubmit={handleSubmitSignUp}>
                    <p>Email para cadastro: </p>
                    <input
                        type="email"
                        placeholder="Insira seu melhor e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p>Como podemos te chamar?</p>
                    <input
                        type="text"
                        placeholder="Insira seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p>Crie uma senha: </p>
                    <input
                        type="password"
                        placeholder="Crie uma senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>Confirme sua senha: </p>
                    <input
                        type="password"
                        placeholder="Confirme a senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                </form>
                <h1>Já tem conta? Faça login</h1>
                <button className="bg-slate-400 rounded-3xl p-2" onClick={()=>navigate("/login")}>Login</button>
                </div>
            }
        </div>
    );
};
export default SignUp;
