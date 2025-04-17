import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Accounts = () => {
    const navigate = useNavigate();
    const { userData, fetchUserData, loading } = useAuth();

    if (loading || !userData) {
        return <p className="text-white">Carregando dados do usuário...</p>;
    }

    const accounts = userData.accounts;

    const RenderAccounts = ({ accounts }) => {
        if (accounts.length === 0) {
            return <p className="text-white">Nenhuma conta cadastrada!</p>;
        } else {
            return accounts.map((account) => (
                <li key={account.id} className="bg-[#2c2c36] p-4 rounded-xl shadow-md flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{account.name}</span>
                        <span className={`${account.balance >= 0 ? "text-green-400" : "text-red-400"} font-medium`}>
                            {account.balance.toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEditAccount(account.id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400 text-sm"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteAccount(account.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 text-sm"
                        >
                            Excluir
                        </button>
                    </div>
                </li>
            ));
        }
    };

    const handleEditAccount = (accountId) => {
        alert("Vou editar sua conta");
    };

    const handleDeleteAccount = async (accountId) => {

        alert("Vou excluir sua conta");
        const deleteAcc = await fetch(`${import.meta.env.VITE_API_URL}/accounts/delete-account`,{
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ accountId }),
            credentials: 'include'
        });


        if(deleteAcc.ok){
            alert("Conta apagada com sucesso!");
            await fetchUserData();
        }else{
            alert("Nao foi possivel deletar a conta");
        }
    };

    return (
        <div className="bg-maingray w-4/5 rounded-3xl p-5 flex flex-col space-y-5">
            <button onClick={() => navigate("/month")}>
                <FaArrowLeftLong className="bg-white rounded-full p-1 hover:bg-slate-200" size={30} />
            </button>

            <div className="bg-[#393943] p-5 rounded-2xl">
                <h1 className="text-white text-xl font-bold mb-4">Contas</h1>
                <ul className="flex flex-col space-y-3">
                    {
                        !accounts
                            ? <p className="text-white">Carregando...</p>
                            : <RenderAccounts accounts={accounts} />
                    }
                </ul>
            </div>

            <button
                onClick={() => navigate("/create-account")}
                className="self-start mt-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-xl"
            >
                Criar nova conta
            </button>
        </div>
    );
};

export default Accounts;
