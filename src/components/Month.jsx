import { useEffect, useState } from "react";
import MonthContent from "./MonthContent"
import { IoIosArrowDown } from "react-icons/io";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

import LoadingWrapper from "../wrappers/LoadingWrapper";

const Month = () =>{

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const currentMonthIndex = new Date().getMonth();
    const currentMonth = months[currentMonthIndex];
    const [month, setMonth] = useState(currentMonth);

    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    const [monthYearTransactions, setMonthYearTransactions] = useState(null);

    const handleReadMonthTransactions = async() =>{
        try{

            const queryParams = new URLSearchParams({
                month: month,
                year: year
            }).toString();

            const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/readMonthTransaction?${queryParams}`,{
                method: 'GET',
                credentials: 'include', //Permite o envio de cookies Http Only
            });

            if(response.ok){
                const data = await response.json();
                setMonthYearTransactions(data);
                
            }else{
                console.error('Falha ao buscar transacoes')
            }
        }catch(error){
            console.error('Erro ao ler as transacoes do mes: ', error)
        }
    }
    useEffect(()=>{
        handleReadMonthTransactions();
    }, [month, year]) //O useEffect sera executado sempre quem os estados 'month' ou 'year' mudarem

    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const toggleMonthDropdown = () =>{
        setIsMonthDropdownOpen((prevState) => !prevState)
    }

    const handleMonthSelection = (month) =>{
        setMonth(month);
        setIsMonthDropdownOpen(false); //Fecha o dropdown apos selecionar um mes
    }

    const incrementYear = () =>{
        setYear(prevYear => prevYear + 1);
    }
    const decrementYear = () =>{
        setYear(prevYear => prevYear - 1 );
    }
    return(
        <div className="bg-maingray w-4/5 h-4/5 rounded-3xl p-3 justify-items-center">
            <div className="relative flex flex-col justify-start items-center min-w-96 min-h-96">
                <div className="flex justify-items-center">
                    <div className="flex space-x-3 items-center justify-center p-1 bg-slate-400 rounded-full">
                        <button className="p-1 bg-slate-400 rounded-full hover:bg-slate-600" onClick={()=>decrementYear()}><SlArrowLeft /></button>
                        <h1 className="text-white text-xl font-extrabold">{year}</h1>
                        <button className="p-1 bg-slate-400 rounded-full hover:bg-slate-600" onClick={()=>incrementYear()}><SlArrowRight /></button>
                    </div>
                    <button
                        onClick={toggleMonthDropdown}
                        className="flex items-auto p-2  hover:bg-green-600 hover:rounded-xl items-center" >
                        <h1 className="text-white text-xs font-bold">{month}</h1>
                        <h2><IoIosArrowDown size={20} className="ml-4 bg-white rounded-2xl"/></h2>
                    </button>
                </div>
                {isMonthDropdownOpen &&
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
                <div className=" bg-white rounded-3xl p-4 mt-5">
                        <LoadingWrapper children={
                            <MonthContent monthYearTransaction={monthYearTransactions} month={month} year={year} />}>
                        </LoadingWrapper>
                        
                </div>
            </div>
        </div>
    )
}
export default Month