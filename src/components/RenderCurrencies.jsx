import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const RenderCurrencies = ({handleCurrencySelected}) =>{

    const {userData} = useAuth();
    

    const [isListVisible, setIsListVisible] = useState(true)
    const toggleIsListVisible = () =>{
        setIsListVisible(prev => !prev)
    }

    const [currencyLabel, setCurrencyLabel] = useState(null)
    const handleSetCurrencyLabel = (label) =>{
        setCurrencyLabel(label)
    }

    const currencies = userData.currencies;

    return(
        <>
            {isListVisible ?
                <ul className="border border-black border-1  rounded-2xl">
                    {currencies.map((curr) =>
                        <li key={curr.id}>
                            <button
                            className="account-icon"
                            onClick={() => 
                            {
                                handleCurrencySelected(curr.id);
                                handleSetCurrencyLabel(curr.name);
                                toggleIsListVisible();
                            }
                            }
                            >
                                {curr.name}
                            </button>
                        </li>
                    )}
                </ul>
            :
                <button
                    className="border border-black border-1 category-icon"
                    onClick={toggleIsListVisible}
                    >
                        {currencyLabel}
                </button>
            }
        </>
    )
}
export default RenderCurrencies