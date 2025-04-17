import { useState } from "react";
import { useAuth } from '../contexts/AuthContext.jsx';

const RenderCategories = ({ type, handleCategorySelected }) => {
    const { userData } = useAuth();

    const allcategories = userData.categories;
    const rightcategories = allcategories.filter((cat) => cat.type === type);

    const [isListVisible, setIsListVisible] = useState(true);
    const [categoryLabel, setCategoryLabel] = useState(null);

    const toggleIsListVisible = () => {
        setIsListVisible((prev) => !prev);
    };

    const handleSetCategoryLabel = (label) => {
        setCategoryLabel(label);
    };

    return (
        <>
            {isListVisible ? (
                <ul className="bg-[#393943] rounded-2xl p-4 space-y-3">
                    {rightcategories.map((category) => (
                        <li
                            key={category.id}
                            className="flex justify-between items-center bg-[#2c2c36] p-3 rounded-lg shadow-sm hover:bg-[#2c2c10]"
                            onClick={() => {
                                handleCategorySelected(category.id);
                                handleSetCategoryLabel(category.name);
                                toggleIsListVisible();
                            }}
                        >
                            <button className="text-white font-medium text-left">
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <button
                    className="bg-[#393943] text-white font-semibold px-4 py-2 rounded-xl"
                    onClick={toggleIsListVisible}
                >
                    {categoryLabel}
                </button>
            )}
        </>
    );
};

export default RenderCategories;
