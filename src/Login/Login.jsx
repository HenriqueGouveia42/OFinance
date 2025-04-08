import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, logout, isAuthenticated } = useAuth(); // Agora verificamos se o usuário já está autenticado
    const navigate = useNavigate();

    // Verifica se o usuário já está autenticado ao montar o componente
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/status`, {
                    method: "GET",
                    credentials: 'include', // Permite envio de cookies HTTP-only
                });

                if (response.ok) {
                    const data = await response.json();
                    login(); //A variável de contexto 'isAuthenticated' recebe true
                    navigate('/month'); // Redireciona para a página protegida
                } else {
                    logout(); // Marca como deslogado
                }
            } catch (error) {
                console.error("Erro ao validar token:", error);
                logout(); // Em caso de erro, assume que o usuário está deslogado
            }
        };

        if (!isAuthenticated) {
            checkAuthStatus();
        }
    }, [isAuthenticated, login, logout, navigate]);

    // Função de login com melhoria na verificação de resposta
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Permite cookies HTTP-only
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.message || "Login ou senha incorretos"}`);
                return;
            }

            login(); //A variável de contexto 'isAuthenticated' recebe true
            alert("Login feito com sucesso!");
            navigate('/month'); //Redireciona para a página protegida

        } catch (error) {
            console.error('Erro ao logar', error);
            alert("Erro ao logar");
        }
    };

    return (
        <div className="bg-orange-400 w-screen h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmitLogin} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Insira aqui o e-mail cadastrado"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Insira aqui a senha"
                />
                <button type="submit" className="p-2 bg-slate-400 rounded-3xl mt-2 hover:shadow-2xl hover:bg-slate-600">
                    Entrar
                </button>
            </form>
            <div>
                <h1>Ainda não tem conta? Cadastre-se!</h1>
                <button 
                    className="bg-slate-500 rounded-3xl p-2"
                    onClick={() => navigate("/signup")}
                >
                    Cadastre-se
                </button>
            </div>
        </div>
    );
};

export default Login;
