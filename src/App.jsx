
import { EyeProvider } from "./Contexts/EyeContext.jsx";
import { TransactionTypeProvider } from "./contexts/TransactionTypeContext.jsx";

import SideBar from "./components/SideBar.jsx"
import Header from "./components/Header"
import MainPanel from "./components/MainPanel";

function App() {
  return (
    <TransactionTypeProvider>
      <div className="flex flex-col">
      <Header />
        <div className="grid grid-cols-2">
          <SideBar />
          <EyeProvider>
            <MainPanel/>
          </EyeProvider>
        </div>
      </div>
    </TransactionTypeProvider>
  )
}
export default App
