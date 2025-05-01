import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CreateAccount = () => {
    const navigate = useNavigate();
    const { fetchUserData } = useAuth();
    const [accountName, setAccountName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const createAcc = await fetch("http://localhost:5000/accounts/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountName }),
            credentials: "include", // Permite cookies HTTP-Only
        });

        if (createAcc.ok) {
            await fetchUserData();
            alert("Conta criada com sucesso");
            navigate("/accounts");
        } else {
            alert("Não foi possível criar a conta");
        }
    };

    const handleInputChange = (e) => {
        setAccountName(e.target.value);
    };

    return (
        <div className="bg-maingray w-4/5 h-4/5 rounded-3xl p-6 flex flex-col space-y-6">
            <button
                className="self-start text-white hover:text-gray-300"
                onClick={() => navigate("/accounts")}
            >
                <FaArrowLeftLong size={28} />
            </button>

            <h2 className="text-xl text-white font-semibold">Criar nova conta</h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full max-w-md self-center"
            >
                <label htmlFor="accountName" className="text-white text-sm">
                    Nome da conta
                </label>
                <input
                    id="accountName"
                    type="text"
                    placeholder="Ex: Banco do Brasil"
                    value={accountName}
                    onChange={handleInputChange}
                    className="rounded-lg px-4 py-2 bg-[#2c2c38] text-white border border-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200 ease-in-out"
                >
                    Criar conta
                </button>
            </form>
        </div>
    );
};

export default CreateAccount;
