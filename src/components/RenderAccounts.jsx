import Accounts from "../assets/Accounts.json"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const RenderAccounts = ({handleAccountSelected}) =>{

    const {userData} = useAuth();
    

    const [isListVisible, setIsListVisible] = useState(true)
    const toggleIsListVisible = () =>{
        setIsListVisible(prev => !prev)
    }

    const [accountLabel, setAccountLabel] = useState(null)
    const handleSetAccountLabel = (label) =>{
        setAccountLabel(label)
    }

    const accounts = userData.accounts;

    return(
        <>
            {isListVisible ?
                <ul className="border border-black border-1  rounded-2xl">
                    {accounts.map((acc) =>
                        <li key={acc.id}>
                            <button
                            className="account-icon"
                            onClick={() => 
                            {
                                handleAccountSelected(acc.id);
                                handleSetAccountLabel(acc.name);
                                toggleIsListVisible();
                            }
                            }
                            >
                                {acc.name}
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