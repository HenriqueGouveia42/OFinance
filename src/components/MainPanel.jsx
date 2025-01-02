import { Outlet } from "react-router-dom";

const MainPanel = () =>{

    return(
        <div className="pl-52 pt-24 overflow-auto w-screen h-screen bg-gray-500 p-8 justify-items-center">
            <Outlet/>
        </div>
    )
}
export default MainPanel




