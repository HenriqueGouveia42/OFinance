import { FaArrowCircleLeft } from "react-icons/fa";
import Numpad from "./Numpad.jsx";
const NewTransaction = ({type, value}) => {
    return(
        <>
            <div className= "flex flex-col w-[15rem] h-[32rem]">
                <div className={`flex flex-col w-full h-1/5 ${type === 'revenue' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <div className="flex items-center">
                            <buttom className="p-3 rounded-3xl hover:cursor-pointer"><FaArrowCircleLeft color="white" size="25"/></buttom>
                            <h1 className="font-medium text-white">Nova receita</h1>
                        </div>
                    <div className="flex items-center">
                            <div className="flex flex-col">
                                <h1 className="text-xs text-white">Valor da Receita</h1>
                                <buttom className="text-lg text-white hover:cursor-pointer hover:bg-green-600 ">{((parseInt(value))/100).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</buttom>
                            </div>
                        </div>
                </div>
                <div className="flex flex-col w-full h-4/5 bg-white">
                    <Numpad/>  
                </div>
            </div>
        </>
    )
}
export default NewTransaction