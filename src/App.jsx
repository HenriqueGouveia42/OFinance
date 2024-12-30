
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
import NewAccountType from "./components/NewAccountType.jsx";

import LoggedInLayout from "./components/LoggedInLayout.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TransactionTypeProvider>
        <Routes>
              {/*Rotas publicas*/}
              <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>}/>
              <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
              
              {/*Rotas protegidas*/}
          <Route path="/" element={<ProtectedRoute><EyeProvider><LoggedInLayout/></EyeProvider></ProtectedRoute>}> 
            <Route path="month" element={<Month/>}/>
            <Route path="newtransaction" element={<NewTransaction/>}/>
            <Route path="accounts" element={<Accounts/>}/>
            <Route path="credit-cards" element={<CreditCards/>}/>
            <Route path="new-expense-or-revenue-type" element={<NewExpenseOrRevenueType/>}/>
            <Route path="new-account-type" element={<NewAccountType/>}/>
          </Route>
        </Routes>
        </TransactionTypeProvider>
      </AuthProvider>
    </Router>
  )
}
export default App
