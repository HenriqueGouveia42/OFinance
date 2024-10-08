import { useState } from "react";

//handleTypeRepeatClick é a função de lifting-up-state que atualiza um estado no componente pai
const RenderRepeatTypes = ({handleTypeRepeatClick}) =>{
    //Frequencias de repeticao, se houver repeticao
    const frequencyOptions =
    [
        { value: 'daily', label: 'Todos os dias' },
        { value: 'weekly', label: 'Semanal' },
        { value: 'first_day_of_month', label: 'Mensal no primeiro(a) dia' },
        { value: 'annualy', label: 'Anual em dia' },
        { value: 'every_day_of_week', label: 'Todos os dias da semana' },
    ];

    const [isListVisible, setIsListVisible] = useState(true);
    const toggleSetIsListVisible = () =>{
        setIsListVisible(prev => !prev)
    }

    //Atualiza um estado interno ao componente
    const [typeRepeat, setTypeRepeat] = useState(null);
    const handleSetTypeRepeat = (value) =>{
        setTypeRepeat(value)
    }

    return(
        <>
            {isListVisible ?
                <ul className="border border-black border-1">
                {
                    frequencyOptions.map((option)=>(
                        <li key={option.value}>
                            <button
                            className="recurrency-type"
                            onClick={() => 
                            {
                                handleTypeRepeatClick(option.value);
                                handleSetTypeRepeat(option.label);
                                toggleSetIsListVisible();
                            }
                            }
                            >
                                {option.label}
                            </button>
                        </li>
                    ))
                }
            </ul>
            :
            <>
                <button
                className="recurrency-type border border-black border-1"
                onClick={toggleSetIsListVisible}
                >
                    {typeRepeat}
                </button>
            </>
            }
        </>
    )
}
export default RenderRepeatTypes