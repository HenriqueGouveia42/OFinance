import { CgBackspace } from "react-icons/cg";
import { useState } from "react";

const Numpad = ({valueReceivedFromNumPadtoNewTransaction, detailsOrNumpad}) =>{

    const [inputValue, setInputValue] = useState('');
    

    
    const handleInputButtonClick = (digit) =>{
        setInputValue(prevValue => prevValue + digit);
    }
    const handleDeleteButtonClick = () =>{
        setInputValue(prevValue => prevValue.slice(0,-1));
    }
    const handleSendButtonClick = () =>{
        //Sobe o valor para o componente pai NewTransaction via "Lifting-up-state"
        valueReceivedFromNumPadtoNewTransaction(inputValue)
        //Zera o valor de Input
        setInputValue('0');
        detailsOrNumpad();
    }
    const handlePointInputButtonClick = ()=>{
        setInputValue(prevValue =>{
            if (prevValue.includes('.')){
                return prevValue;
            }
            return prevValue+'.';
        })
    }
    return(
        <div className="flex flex-col items-center justify-center bg-gray-200 h-full p-2">
            <div className="pl-2 pr-2 w-full flex justify-between"><h1>R$</h1></div>
            <div className="flex">
                {<p>{inputValue || '0'}</p>}
            </div>
            <hr className="w-4/5 h-1 mx-auto my-4 bg-gray-100 border-0 md:my-10 dark:bg-gray-700"></hr>
            <div className="grid grid-cols-3 gap-2 justify-items-center">
                {
                    ['7','8','9','4','5','6','1','2','3'].map(digit => (
                        <buttom key={digit}
                        className="numpad-button" 
                        onClick={() => handleInputButtonClick(digit)}>
                            {digit}
                        </buttom>
                    ))
                }
                <button className="numpad-button col-span-1" onClick={()=>handleInputButtonClick('0')}>0</button>
                <button className="numpad-button col-span-1" onClick={()=>handlePointInputButtonClick('.')}>.</button>
            </div>
            <div className="numpad-line">
                <buttom className="numpad-bottom-button" onClick={()=>handleDeleteButtonClick()}><CgBackspace size="35"/></buttom>
                <buttom className="numpad-bottom-button" onClick={()=>handleSendButtonClick()}>Concluido</buttom>
            </div>
        </div>
    )
}
export default Numpad




