import SideBar from "./components/SideBar.jsx"
import Header from "./components/Header"
import MainPanel from "./components/MainPanel";
import { EyeProvider } from "./Contexts/EyeContext.jsx";

function App() {
  return (
    <div className="flex flex-col">
        <Header />
      <div className="flex">
        <EyeProvider>
          <SideBar />
          <MainPanel/>
        </EyeProvider>
      </div>
    </div>
  )
}
export default App
