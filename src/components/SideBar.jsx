import { BsCashCoin } from "react-icons/bs";
import { HiCreditCard } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";

const SideBarIcon = ({icon, name}) =>{
    return(
        <button className="icon ml-2">
            <div className="flex items-center">
                {icon}
                <div className="text-white ml-5 break-words text-xs">
                    {name}
                </div>
            </div>
        </button>
    )
}
const SideBar = () =>{
    
    return(
        <div className="fixed top-16 left-0 z-10 flex flex-col left-0 h-screen min-w-36  bg-primary text-secondary shadow-lg pl-9">
            <div className="items-center space-y-7">
                <SideBarIcon icon={<CiCirclePlus size="30"/>} name={"Novo"}/>
                <SideBarIcon icon={<BsCashCoin size="30"/>} name={"Contas"}/>
                <SideBarIcon icon={<HiCreditCard size="30"/>} name={"Cartões"}/>
            </div>
        </div>
    )
}
export default SideBar