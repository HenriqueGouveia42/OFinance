import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext";

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [type, setType] = useState("revenue");
    const {fetchUserData} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type !== "revenue" && type !== "expense") {
            alert("Tipo inválido. Escolha 'revenue' ou 'expense'");
            return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/category/create-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name: categoryName,
                type: type
            })
        });

        if (res.ok) {
            await fetchUserData();
            alert("Categoria criada com sucesso!");
            navigate("/categories");
        } else {
            alert("Erro ao criar categoria.");
        }
    };

    const selectColor = type === "revenue" ? "bg-green-100 text-green-800 border-green-400" : "bg-red-100 text-red-800 border-red-400";

    return (
        <div className="bg-maingray w-4/5 h-4/5 rounded-3xl p-6 space-y-6">
            <button onClick={() => navigate("/categories")}>
                <FaArrowLeftLong className="bg-white rounded-full p-1 hover:bg-slate-200" size={30} />
            </button>

            <p className="text-xl font-semibold">Criar nova categoria</p>

            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome da categoria"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`p-3 rounded-lg border font-medium ${selectColor} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    required
                >
                    <option value="revenue" className="text-green-800">Receita</option>
                    <option value="expense" className="text-red-800">Despesa</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full py-2 px-4"
                >
                    Criar Categoria
                </button>
            </form>
            {console.log(categoryName)}
            {console.log(type)}
        </div>
    );
};

export default CreateCategory;
