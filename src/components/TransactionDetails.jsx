

import { useState } from "react";



//DetailLine:
//Componente react que representa uma linha do componente pai TransactionDetails

 //selectedPayDay, setSelectedPayDay, handlePayDayClick:
//Controle do estado do dia selecionado

//typeRepeat, setTypeRepeat, handleTypeRepeatClick:
//Controle do estado da frequencia de repeticao

//settings, setSettings, toggleSettings:
    //Objeto que guarda os estados booleanos inseridos pelo usuários, como "Recebido", "Mais - Exibir mais detalhes do formulário", "Fixo, "Repete"...
    //Os estados booleanos deste componente react serão todos acessado por meio deste objeto
    //toggleSettings é a função que chama o setSettings e atualiza o valor atual para o valor lógico oposto - !
    //...prev é DESESTRUTURACAO => Pega todas as propriedades do objeto prev e copia isso para um novo objeto
        //Exemplo:
            //const prev = { received: true, more: false };
            //const newObj = { ...prev }; 
            // newObj agora é { received: true, more: false } (cópia de prev)

//frequencyOptions:
    //Opções de frequência para transações que se repetem



const TransactionDetails = ({detailsReceivedFromTransactionDetailstoNewTransaction}) => {

    

    
    

    

    

    

    

    return (
        <div className="grid grid-cols-1 gap-y-2 h-96 overflow-y-auto">
            
            
            
            
            
            
                {settings.more ?
                    <>
                        <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600" onClick={()=>toggleSettings('more')}><label>Menos Detalhes</label></button>
                        
    
                        {settings.repeat &&
                            <>
                                
                            </> 
                            
                        }
                        
                    </> 
                :
                <button className="bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600" onClick={()=>toggleSettings('more')}><label>Mais detalhes</label></button>}
            <button className="w-full bg-slate-400 p-1 rounded-3xl m-2 hover:bg-slate-600"
            onClick={()=>{
                sendUnifiedObject();
                //console.log(JSON.unifiedObject)
                }}>
                Salvar e continuar
                </button>
        </div>
    );
};

export default TransactionDetails;
