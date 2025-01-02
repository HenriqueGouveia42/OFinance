import { useContext } from "react"
import { TransactionTypeContext } from "../contexts/TransactionTypeContext.jsx";

const NewExpenseOrRevenueType = () =>{

    // Acessando o contexto
    const {transactionType} = useContext(TransactionTypeContext);

    return(
        <>
            {transactionType === 'expense' ? <h1>Nova categoria de despesa</h1> : <h1>Nova categoria de receita</h1>}
        </>
    )
}
export default NewExpenseOrRevenueType