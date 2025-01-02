import { useState } from "react";
import MonthContent from "./MonthContent"
import { IoIosArrowDown } from "react-icons/io";



const Month = () =>{

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () =>{
        setIsDropdownOpen((prevState) => !prevState)
    }

    const [selectedMonth, setSelectedMonth] = useState("Abril");
    const handleMonthSelection = (month) =>{
        setSelectedMonth(month);
        setIsDropdownOpen(false); //Fecha o dropdown apos selecionar um mes
    }

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    return(
        <div className="relative flex flex-col justify-start items-center min-w-96 min-h-96">
            <button
             onClick={toggleDropdown}
             className="flex items-auto p-2  hover:bg-green-600 hover:rounded-xl items-center" >
                <h1 className="text-white text-xs font-bold">{selectedMonth}</h1>
                <h2><IoIosArrowDown size={20} className="ml-4 bg-white rounded-2xl"/></h2>
            </button>
            {isDropdownOpen &&
                <div className="absolute top-12 bg-white rounded-xl shadow-lg p-2 min-w-[10rem]">
                    {months.map((month) => (
                        <button
                            key={month}
                            className="block w-full text-left p-2 text-sm hover:bg-gray-200 rounded"
                            onClick={() => handleMonthSelection(month)}
                        >
                            {month}
                        </button>
                    ))}
                </div>
            }
            <div className=" bg-white rounded-3xl p-4">
                    <MonthContent />
            </div>
        </div>
        
    )
}
export default Month