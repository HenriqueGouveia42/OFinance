import { createContext, useContext, useEffect, useState } from "react";

// Criando o Contexto
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);

    // Função para buscar os dados do usuário
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/get-user-data", {
                    method: "GET",
                    credentials: "include", // Permite envio de cookies HttpOnly
                });
                if (!response.ok) throw new Error("Erro ao buscar dados do usuário.");

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Erro ao buscar os dados do contexto geral do usuário: ", error);
            }
        };

        fetchData();
    }, [fetchTrigger]); // Atualiza quando fetchTrigger muda

    // Função para forçar atualização dos dados do usuário
    const refetchUserData = () => {
        setFetchTrigger(prev => prev + 1);
    };

    return (
        <UserDataContext.Provider value={{ userData, refetchUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

// Hook personalizado para acessar os dados do usuário
export const useUserData = () => {
    return useContext(UserDataContext);
};
