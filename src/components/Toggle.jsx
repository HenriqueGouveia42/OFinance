const Toggle = ({ onClick, state }) => {
    return (
        <button
            onClick={onClick}
            className={`relative w-20 h-10 rounded-full transition duration-750 ease-linear  ${state ? ' bg-green-300' : ' bg-gray-500'}`}>
            <div 
                className={`relative w-10 h-10 rounded-full transition duration-750 ease-linear ${state ? 'translate-x-10 bg-green-600' : 'translate-x-0 bg-white'}`}>
            </div>
        </button>
    );
};

export default Toggle;
