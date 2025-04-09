import { useState } from "react";
import { useAuth } from '../contexts/AuthContext.jsx'

const RenderCategories = ({type, handleCategorySelected}) =>{

    const {userData} = useAuth();

    var allcategories = userData.categories;

    var rightcategories = allcategories.filter((cat) => cat.type === type )

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
                    {rightcategories.map((category) =>
                        <li key={category.id}>
                            <button
                            className="account-icon"
                            onClick={() =>
                            {
                                handleCategorySelected(category.id);
                                handleSetCategoryLabel(category.name);
                                toggleIsListVisible();
                            }
                            
                            }
                            >
                                {category.name}
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