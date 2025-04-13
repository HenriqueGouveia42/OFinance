import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyCode from "./VerifyCode";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifyCode, setVerifyCode] = useState(false);

    const toggleVerifyCode = () => {
        setVerifyCode((prev) => !prev);
    };

    const navigate = useNavigate();

    const validateForm = () => {
        if (!email) {
            alert("Por favor insira um email");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Por favor, insira um email válido!");
            return false;
        }

        if (!name) {
            alert("Por favor insira seu nome!");
            return false;
        }

        if (password.length < 6) {
            alert("Senha deve ter no mínimo 6 caracteres!");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Senhas não coincidem!");
            return false;
        }

        return true;
    };

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        password,
                    }),
                });

                if (response.status === 201) {
                    alert("Código enviado por e-mail!");
                    toggleVerifyCode();
                } else {
                    const errorData = await response.json();
                    alert(`Erro: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Erro ao cadastrar: ", error);
                alert("Erro de rede. Tente novamente mais tarde!");
            }
        }
    };

    return (
        <div className="w-full flex justify-center">
            {verifyCode ? (
                <VerifyCode email={email} />
            ) : (
                <div className="w-full max-w-md bg-gray-100 p-8 rounded-xl shadow-md">
                    <h2 className="text-lg text-center font-semibold mb-6 text-gray-700">
                        Crie sua conta e use o controlador financeiro <span className="text-orange-500">Ofinance</span>!
                    </h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmitSignUp}>
                        <input
                            type="email"
                            placeholder="Insira seu melhor e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <input
                            type="text"
                            placeholder="Como podemos te chamar?"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <input
                            type="password"
                            placeholder="Crie uma senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <input
                            type="password"
                            placeholder="Confirme a senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <button
                            type="submit"
                            className="bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignUp;
