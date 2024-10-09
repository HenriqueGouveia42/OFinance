import { CgBackspace } from "react-icons/cg";
import { useEffect, useState } from "react";


const Numpad = ({transactionValueInput}) =>{

    const [inputNumber, setInputNumber] = useState('');
    const handleDigitButtonClick = (digit) =>{
        setInputNumber(prevValue => prevValue + digit);
    }
    const handleDeleteDigitButtonClick = () =>{
        setInputNumber(prevValue => prevValue.slice(0,-1));
    }

    const handlePointInputButtonClick = ()=>{
        setInputNumber(prevValue =>{
            if (prevValue.includes('.')){
                return prevValue;
            }
            return prevValue+'.';
        })
    }

    const resetInputNumber = () =>{
        setInputNumber(prevValue => '')
    }

    // Captura a entrada do teclado
    const handleKeyDown = (event) => {
        const { key } = event;

        if (key >= '0' && key <= '9') {
            // Se for número, adiciona ao input
            handleDigitButtonClick(key);
        } else if (key === '.' && !inputNumber.includes('.')) {
            // Se for ponto, e ainda não tiver ponto, adiciona
            handlePointInputButtonClick();
        } else if (key === 'Backspace') {
            // Se for backspace, apaga o último dígito
            handleDeleteDigitButtonClick();
        } else if (key === 'Enter') {
            // Se for Enter, confirma o valor
            inputNumber === '' ? transactionValueInput('0') : transactionValueInput(inputNumber);
            resetInputNumber();
            
        }
    };

    useEffect(() =>{
        window.addEventListener('keydown', handleKeyDown);
        return () =>{
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [inputNumber]); //o useEffect depende do inputnumber

    return(
        <div className="flex flex-col items-center justify-center bg-gray-200 h-full p-2">
            <div className="pl-2 pr-2 w-full flex justify-between"><button>R$</button></div>
            <div className="flex">
                {<p>{inputNumber || '0'}</p>}
            </div>
            <hr className="w-4/5 h-1 mx-auto my-4 bg-gray-100 border-0 md:my-10 dark:bg-gray-700"></hr>
            <div className="grid grid-cols-3 gap-2 p-3 justify-items-center">
                {
                    ['7','8','9','4','5','6','1','2','3'].map(digit => (
                    <button key={digit} 
                    className="numpad-button" 
                    onClick={() => handleDigitButtonClick(digit)}>
                        {digit}
                    </button>))
                }
                <button className="numpad-button col-span-1" onClick={()=>handleDigitButtonClick('0')}>0</button>
                <button className="numpad-button col-span-1" onClick={()=>handlePointInputButtonClick('.')}>.</button>
            </div>
            <div className="numpad-line">
                <button className="numpad-bottom-button" onClick={()=>handleDeleteDigitButtonClick()}><CgBackspace size="35"/></button>
                <button className="numpad-bottom-button" onClick={() => {
                        inputNumber === '' ? transactionValueInput('0') : transactionValueInput(inputNumber);
                        resetInputNumber();
                    }}>
                    Concluído
                </button>
            </div>
        </div>
    )
}
export default Numpad




