import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'

const LoadingWrapper = ({ children }) => {
    const { loading, userData } = useAuth();

    if (loading || !userData) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">Carregando dados do usuário...</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default LoadingWrapper;
