import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyCode = ({ email }) => {
    const [code, setCode] = useState("");

    const navigate = useNavigate(); //Hook useNavigate para navegação

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/signup/verify',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        code,
                    }),
                }
            );
            if (response.status === 201) {
                alert('Codigo validado. Usuario cadastrado com sucesso!');
                navigate("/login");
            } else {
                const errorData = await response.json();
                alert('Codigo invalido ou expirado!');
                alert(`Erro: ${errorData.message}`);
            }

        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            alert("Erro de rede. Tente novamente mais tarde!");
        }
    }

    return (
        <div className="flex flex-col items-center mt-4 px-4">
            <div className="text-center mb-4">
                <h1 className="text-xl font-semibold">Enviamos um código de confirmação para o email {email}.</h1>
                <h1 className="text-lg mt-2">Insira abaixo o código recebido!</h1>
            </div>
            <form onSubmit={handleVerifyCode} className="flex flex-col items-center w-full max-w-sm">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => { setCode(e.target.value) }} //Atualiza 'code' ao digitar
                    placeholder="Insira aqui o código"
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
                <button
                    type="submit"
                    className="p-2 bg-slate-400 rounded-3xl mt-4 w-full hover:shadow-2xl hover:bg-slate-600 hover:scale-105 transition-transform duration-200"
                >
                    Confirmar Código
                </button>
            </form>
        </div>
    );
};

export default VerifyCode;
