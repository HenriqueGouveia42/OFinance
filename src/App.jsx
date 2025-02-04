
import { EyeProvider } from "./Contexts/EyeContext.jsx";
import { TransactionTypeProvider } from "./contexts/TransactionTypeContext.jsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

import SignUp from './SignUp/SignUp.jsx'
import Login from './Login/Login.jsx'

import Month from "./components/Month.jsx";
import NewTransaction from "./components/NewTransaction.jsx";
import Accounts from "./components/Accounts.jsx"
import CreditCards from "./components/CreditCards.jsx";
import NewExpenseOrRevenueType from "./components/NewExpenseOrRevenueType.jsx";
import CreateAccountType from "./components/CreateAccount.jsx";

import LoggedInLayout from "./components/LoggedInLayout.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TransactionTypeProvider>
        <Routes>
          
          <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
          
          {/*LoogedInLayout contem os tres principais componentes react da area logada: Header, SideBar e MainPanel, todos fixos*/}
          {/*O que muda dinamicamente dependendo da rota acessada é o CONTEUDO de MainPanel, atraves de <Outlet />, que vai 'cuspir' os elmentos <Month />, <Accounts />, etc, dependendo da navegacao do usuario via navigate("...")*/}
          <Route path="/" element={<ProtectedRoute><EyeProvider><LoggedInLayout/></EyeProvider></ProtectedRoute>}> 
            <Route path="/month" element={<Month/>}/>
            <Route path="/newtransaction" element={<NewTransaction/>}/>
            <Route path="/accounts" element={<Accounts/>}/>
            <Route path="/credit-cards" element={<CreditCards/>}/>
            <Route path="/new-expense-or-revenue-type" element={<NewExpenseOrRevenueType/>}/>
          </Route>
        </Routes>
        </TransactionTypeProvider>
      </AuthProvider>
    </Router>
  )
}
export default App
