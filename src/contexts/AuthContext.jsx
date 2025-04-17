import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const verifyAndFetch = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/status`, {
                    method: 'GET',
                    credentials: 'include', //Permite o envio automatico dos cookies
                });
                if (response.ok) {
                    login();
                    await fetchUserData();
                }else{
                    logout();
                }
            } catch (error) {
                console.error('Erro ao verificar o token:', error);
                logout();
            } finally{
                setLoading(false); //Marca como carregado mesmo com erro
            }
        };
        verifyAndFetch();
    }, []); //Por ter array de dependencias vazio, sempre que o componente for carregado, a função 'verifyAndFetch' será executada

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = async() => {
        try{
            await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`,{
                method: "POST",
                credentials: "include",
            });

            setIsAuthenticated(false);

        }catch(error){
            console.error("Erro ao fazer logout: ", error);
        }
    };

    const fetchUserData = async() =>{
        try{
            const userDataResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/get-user-data`, { //Retorna um objeto do tipo 'Response', que é uma representação da resposta HTTP retornada pelo fetch 
                method: 'GET',
                credentials: 'include' //Permite o envio automatico dos cookies
            })
    
            if(userDataResponse.ok){
                const user = await userDataResponse.json();
                setUserData(user);
            }else{
                console.error('Erro ao buscar dados do usuario');
            }
        }catch(error){
            console.error('Erro ao buscar os dados do usuario', error);
        }
    }

    useEffect(() =>{
        if(!userData){
            fetchUserData();
        }
    }, [userData]);

    return (
        <AuthContext.Provider value={
            {   isAuthenticated,
                login,
                logout,
                userData,
                fetchUserData,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
