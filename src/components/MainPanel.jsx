import Month from "./Month"
import NewTransaction from "./NewTransaction.jsx";

const MainPanel = () =>{

    return(
        <div className="pl-52 pt-24 overflow-auto w-screen h-screen bg-gray-500 p-8 justify-items-center">
            <Month/>
            <NewTransaction/>
        </div>
    )
}
export default MainPanel




