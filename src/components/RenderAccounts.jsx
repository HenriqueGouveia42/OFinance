import Accounts from "../assets/Accounts.json"

import { useState } from "react"

const RenderAccounts = ({handleAccountSelected}) =>{
    

    const [isListVisible, setIsListVisible] = useState(true)
    const toggleIsListVisible = () =>{
        setIsListVisible(prev => !prev)
    }

    const [accountLabel, setAccountLabel] = useState(null)
    const handleSetAccountLabel = (label) =>{
        setAccountLabel(label)
    }

    const accounts = Accounts;

    return(
        <>
            {isListVisible ?
                <ul className="border border-black border-1">
                    {accounts.map((acc) =>
                        <li key={acc.value}>
                            <button
                            className="account-icon"
                            onClick={() => 
                            {
                                handleAccountSelected(acc.value);
                                handleSetAccountLabel(acc.label);
                                toggleIsListVisible();
                            }
                            }
                            >
                                {acc.label}
                            </button>
                        </li>
                    )}
                </ul>
            :
                <button
                    className="border border-black border-1 category-icon"
                    onClick={toggleIsListVisible}
                    >
                        {accountLabel}
                </button>
            }
        </>
    )
}
export default RenderAccounts