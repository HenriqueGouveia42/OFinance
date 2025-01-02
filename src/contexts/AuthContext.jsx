import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //Array de dependencias vazio '[]'
    useEffect(() => {
        const verifyToken = async () => {

            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/verify-token', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        login(token);
                    } else {
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Erro ao verificar o token:', error);
                    logout();
                }
            }
        };
        verifyToken();
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
