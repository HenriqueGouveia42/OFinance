import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyCode = ({email}) =>{
    const [code, setCode] = useState("");

    const navigate = useNavigate(); //Hook useNavigate para navegação
    
    const handleVerifyCode = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/signup/verify',
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        code,
                    }),
                }
            );
            if(response.status === 201){
                alert('Codigo validado. Usuario cadastrado com sucesso!');
                navigate("/login")
            }else{
                const errorData = await response.json();
                alert('Codigo nvalido ou expirado!')
                alert(`Erro: ${errorData.message}`);
            }
            
        }catch(error){
            console.error("Erro ao cadastrar: ", error);
            alert("Erro de rede. Tente novamente mais tarde!");
        }
    }

    return(
        <>
            <h1>Enviamos um codigo de confirmacao para o email {email}.</h1>
            <h1>Insira abaixo o codigo recebido!</h1>
            <form onSubmit={handleVerifyCode} className="flex flex-col mt-2">
                <input 
                type="text"
                value={code}
                onChange={(e)=>{setCode(e.target.value)}} //Atualiza 'code' ao digitar
                placeholder="Insira aqui o codigo"
                />
                <button type="submit" className="p-2 bg-slate-400 rounded-3xl mt-2 hover:shadow-2xl hover:bg-slate-600">Confirmar Codigo</button>
            </form>
            {console.log(email)}
        </>
    )
}
export default VerifyCode