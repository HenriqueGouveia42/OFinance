import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Home = () =>{
    return(
        <>
            <p>I am home!</p>
            <button onClick={() =>{
                Navigate("/login");
            }}>Login</button>
        </>
    )
}
export default Home