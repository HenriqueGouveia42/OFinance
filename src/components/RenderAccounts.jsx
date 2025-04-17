import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const RenderAccounts = ({ handleAccountSelected }) => {
    const { userData } = useAuth();
    const [isListVisible, setIsListVisible] = useState(true);
    const [accountLabel, setAccountLabel] = useState(null);

    const toggleIsListVisible = () => {
        setIsListVisible((prev) => !prev);
    };

    const handleSetAccountLabel = (label) => {
        setAccountLabel(label);
    };

    const accounts = userData.accounts;

    return (
        <>
            {isListVisible ? (
                <ul className="bg-[#393943] rounded-2xl p-4 space-y-3">
                    {accounts.map((acc) => (
                        <li
                            key={acc.id}
                            className="flex justify-between items-center bg-[#2c2c36] p-3 rounded-lg shadow-sm hover:bg-[#2c2c10]"
                            onClick={() => {
                                handleAccountSelected(acc.id);
                                handleSetAccountLabel(acc.name);
                                toggleIsListVisible();
                            }}
                        >
                            <button
                                className="text-white font-medium text-left"
                                
                            >
                                {acc.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <button
                    className="bg-[#393943] text-white font-semibold px-4 py-2 rounded-xl"
                    onClick={toggleIsListVisible}
                >
                    {accountLabel}
                </button>
            )}
        </>
    );
};

export default RenderAccounts;
