import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../SignUp/SignUp.jsx";
import { useAuth } from "../contexts/AuthContext";

import ofinancelogo from "../assets/images/ofinancelogo.png";
import loginlogo from "../assets/images/loginlogo.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [loginForm, setLoginForm] = useState("login");
    const [password, setPassword] = useState("");
    const { login, logout, isAuthenticated, fetchUserData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/status`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    login();
                    navigate("/month");
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Erro ao validar token:", error);
                logout();
            }
        };

        if (!isAuthenticated) {
            checkAuthStatus();
        }
    }, [isAuthenticated, login, logout, navigate]);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.message || "Login ou senha incorretos"}`);
                return;
            }

            login();
            await fetchUserData();
            alert("Login feito com sucesso!");
            navigate("/month");
        } catch (error) {
            console.error("Erro ao logar", error);
            alert("Erro ao logar");
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-mono bg-white">
            {/* Logo */}
            <div className="p-4 flex justify-center">
                <img src={ofinancelogo} alt="ofinance logo" className="h-12" />
            </div>

            {/* Conteúdo principal */}
            <div className="flex flex-col md:flex-row items-center justify-center flex-grow gap-8 px-4">
                
                {/* Texto e imagem do lado esquerdo */}
                <div className="flex flex-col items-center text-center max-w-sm">
                    <p className="text-lg text-gray-700 mb-4">
                        Tome de volta o controle de sua vida financeira
                    </p>
                    <img src={loginlogo} alt="Login visual" className="w-64" />
                </div>

                {/* Formulário do lado direito */}
                <div className="w-full max-w-md bg-gray-100 p-8 rounded-xl shadow-md">
                    {/* Botões Login / SignUp */}
                    <div className="flex justify-center space-x-6 mb-6">
                        <button
                            className={`px-5 py-2 rounded-full transition ${
                                loginForm === "login"
                                    ? "bg-gray-300 font-semibold"
                                    : "hover:bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => setLoginForm("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`px-5 py-2 rounded-full transition ${
                                loginForm === "signup"
                                    ? "bg-gray-300 font-semibold"
                                    : "hover:bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => setLoginForm("signup")}
                        >
                            SignUp
                        </button>
                    </div>

                    {/* Formulário de Login */}
                    {loginForm === "login" && (
                        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Insira aqui o e-mail cadastrado"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Insira aqui a senha"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button
                                type="submit"
                                className="bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300"
                            >
                                Entrar
                            </button>
                        </form>
                    )}

                    {/* Componente SignUp */}
                    {loginForm === "signup" && <SignUp />}
                </div>
            </div>
        </div>
    );
};

export default Login;
