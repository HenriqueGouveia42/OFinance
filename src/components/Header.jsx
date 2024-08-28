import { IoMenuOutline } from "react-icons/io5";
import erplogo from "../assets/images/ofinancelogo.png";

const HeaderIcon = ( { icon } ) => (
    <button className="header-icon">
        {icon}
    </button>
) 

const Header = () =>{
    return(
        <div className=" fixed top-0 left-0 z-10 bg-primary h-16 w-full text-white flex items-center">
            <div className="ml-7 flex items-center pl-2">
                <HeaderIcon icon={<IoMenuOutline size="16"/>}/>
                <img src={erplogo} className="ml-5"></img>
            </div>
        </div>
    )
}
export default Header


