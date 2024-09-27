import { useState } from "react";

const Toggle = () => {

    const [received, setReceived] = useState(false);

    const handleReceivedClick = () => {
        setReceived(prevValue => !prevValue);
    };

    return (
        <button 
            onClick={handleReceivedClick} 
            className={`relative w-20 h-10 rounded-full transition duration-750 ease-linear ${received ? 'bg-green-300' : 'bg-gray-500'}`}
        >
            <div
                className={`relative w-10 h-10 rounded-full transition duration-750 ease-linear ${received ? 'translate-x-10 bg-green-600' : 'translate-x-0 bg-white'}`}
            >
            </div>
        </button>
    );
};

export default Toggle;
