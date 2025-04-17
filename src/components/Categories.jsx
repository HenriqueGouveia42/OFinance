import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Categories = () => {
    const { userData } = useAuth();
    const navigate = useNavigate();

    const categories = userData?.categories || [];

    const handleEditCategory = (id) => {
        //console.log("Editar categoria ID:", id);
        alert("Vou editar sua categoria");
    };

    const handleDeleteCategory = (id) => {
        //console.log("Excluir categoria ID:", id);
        alert("Vou deletar sua categoria");
    };

    const revenues = categories.filter(cat => cat.type === 'revenue');
    const expenses = categories.filter(cat => cat.type === 'expense');

    return (
        <div className="bg-maingray w-4/5 h-[500px] rounded-3xl p-5 space-y-6 flex flex-col relative">
            {/* Voltar */}
            <button onClick={() => navigate("/month")}>
                <FaArrowLeftLong className="bg-white rounded-full p-1 hover:bg-slate-200" size={30} />
            </button>

            {/* Título */}
            <h1 className="text-xl text-white font-bold">Categorias cadastradas</h1>

            {/* Categorias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-1">
                {/* Receitas */}
                <div className="bg-[#2f4730] rounded-xl p-4 shadow-md space-y-3">
                    <h2 className="text-green-400 font-semibold text-lg border-b border-green-600 pb-2">Receitas</h2>
                    <ul className="space-y-2">
                        {revenues.map((cat) => (
                            <li key={cat.id} className="flex justify-between items-center bg-green-900 text-white p-3 rounded-lg">
                                <span>{cat.name}</span>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleEditCategory(cat.id)} 
                                        className="bg-white text-black rounded-full px-4 py-1 hover:bg-slate-100 text-sm"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCategory(cat.id)} 
                                        className="bg-red-600 text-white rounded-full px-4 py-1 hover:bg-red-700 text-sm"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                        {revenues.length === 0 && (
                            <p className="text-green-200 text-sm">Nenhuma categoria de receita</p>
                        )}
                    </ul>
                </div>

                {/* Despesas */}
                <div className="bg-[#4a2c2c] rounded-xl p-4 shadow-md space-y-3">
                    <h2 className="text-red-400 font-semibold text-lg border-b border-red-600 pb-2">Despesas</h2>
                    <ul className="space-y-2">
                        {expenses.map((cat) => (
                            <li key={cat.id} className="flex justify-between items-center bg-red-900 text-white p-3 rounded-lg">
                                <span>{cat.name}</span>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleEditCategory(cat.id)} 
                                        className="bg-white text-black rounded-full px-4 py-1 hover:bg-slate-100 text-sm"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCategory(cat.id)} 
                                        className="bg-red-600 text-white rounded-full px-4 py-1 hover:bg-red-700 text-sm"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                        {expenses.length === 0 && (
                            <p className="text-red-200 text-sm">Nenhuma categoria de despesa</p>
                        )}
                    </ul>
                </div>
            </div>

            {/* Botão fixo ao final */}
            <div className="sticky bottom-0 bg-maingray py-4 mt-4 flex justify-center rounded-b-3xl">
                <button 
                    onClick={() => navigate('/create-category')} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full transition-all"
                >
                    Criar nova categoria
                </button>
            </div>
        </div>
    );
};

export default Categories;
