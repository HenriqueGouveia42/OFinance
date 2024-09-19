import { CgBackspace } from "react-icons/cg";
import { IoMdSend } from "react-icons/io";

const Numpad = () =>{
    return(
        <div className="flex flex-col items-center justify-center bg-gray-200 h-full">
            <div className="pl-2 pr-2 w-full flex justify-between"><h1>R$</h1></div>
            <div className="flex">
                <p>30,00</p>
            </div>
            <hr className="w-4/5 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
            <div className="numpad-line">
                <buttom className="numpad-buttom"><p>9</p></buttom>
                <buttom className="numpad-buttom"><p>9</p></buttom>
                <buttom className="numpad-buttom"><p>9</p></buttom>
            </div>
            <div className="numpad-line">
                <buttom className="numpad-buttom"><p>9</p></buttom>
                <buttom className="numpad-buttom"><p>9</p></buttom>
                <buttom className="numpad-buttom"><p>9</p></buttom>
            </div>
            <div className="numpad-line">
                <buttom className="numpad-buttom"><p>9</p></buttom>
                <buttom className="numpad-buttom"><p>9</p></buttom>
                <buttom className="numpad-buttom"><p>9</p></buttom>
            </div>
            <div className="numpad-line">
                <buttom className="numpad-bottom-buttom"><CgBackspace size="35"/></buttom>
                <buttom className="numpad-bottom-buttom"><IoMdSend size="35"/></buttom>
            </div>
        </div>
    )
}
export default Numpad




