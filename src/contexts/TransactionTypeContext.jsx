import { createContext, useState } from "react";

export const TransactionTypeContext = createContext();

export const TransactionTypeProvider = ({children}) => {

    const[transactionType, setTransactionType] = useState(null);
    const handleTransactionType = (type) => {
        const validTypes = ["revenue", "expense"]; // Valores válidos
        if (validTypes.includes(type)) {
            setTransactionType(type);
        } else {
            console.warn(`Invalid transaction type: "${type}"`);
        }
    };
    return(
        <TransactionTypeContext.Provider value={{transactionType, handleTransactionType}}>
            {children}
        </TransactionTypeContext.Provider>
    )
}