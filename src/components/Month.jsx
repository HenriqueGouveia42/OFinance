import MonthContent from "./MonthContent"
import { IoIosArrowDown } from "react-icons/io";



const Month = () =>{
    return(
        <div className="flex flex-col justify-start items-center w-auto">
            <div className="flex items-auto">
                <h1 className="mb-3  text-white text-xs font-bold">Maio</h1>
                <h2><IoIosArrowDown size={20} className="ml-4 bg-white rounded-2xl
                hover:bg-green-600 hover:text-white hover:rounded-xl hover:cursos-pointer"/></h2>
            </div>
            <div className=" bg-white rounded-3xl p-4 min-w-[10rem]">
                    <MonthContent />
            </div>
        </div>
        
    )
}
export default Month