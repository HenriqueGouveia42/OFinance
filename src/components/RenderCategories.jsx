
//Arquivos JSON que armazenam as receitas e as despesas cadastradas pelo usuário
import RevenueCategories from "../assets/RevenueCategoriesOptions.json"
import ExpenseCategories from "../assets/ExpenseCategoriesOptions.json"
import { useState } from "react";

//Renderiza as categorias cadastradas de receitas ou despesas
const RenderCategories = ({type, handleCategorySelected}) =>{
    const categories = type === 'revenue' ? RevenueCategories : ExpenseCategories;

    const [isListVisible, setIsListVisible] = useState(true)
    const toggleIsListVisible = () =>{
        setIsListVisible(prev => !prev)
    }

    const [categoryLabel, setCategoryLabel] = useState(null)
    const handleSetCategoryLabel = (label) =>{
        setCategoryLabel(label)
    }
    return(
        <>
            {isListVisible ?
                <ul className="border border-black border-1 rounded-2xl">
                    {categories.map((category) =>
                        <li key={category.value}>
                            <button
                            className="account-icon"
                            onClick={() =>
                            {
                                handleCategorySelected(category.value);
                                handleSetCategoryLabel(category.label);
                                toggleIsListVisible();
                            }
                            
                            }
                            >
                                {category.label}
                            </button>
                        </li>
                    )}
                </ul>
                :
                <button
                className="border border-black border-1 category-icon"
                onClick={toggleIsListVisible}
                >
                    {categoryLabel}
                </button>
                
            }
            
        </>
    )
}
export default RenderCategories