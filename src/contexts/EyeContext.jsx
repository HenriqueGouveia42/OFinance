import { createContext, useState } from 'react';

export const EyeContext = createContext();

export const EyeProvider = ({ children }) => {
    
    const [isVisible, setIsVisible] = useState(true); // Inicializando o estado com useState, começando com true
    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState);
    };
    return (
        <EyeContext.Provider value={{ isVisible, toggleVisibility }}>
            {children}
        </EyeContext.Provider>
    );
};


