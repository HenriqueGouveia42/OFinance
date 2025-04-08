
import { EyeProvider } from './contexts/EyeContext.jsx';
import { TransactionTypeProvider } from "./contexts/TransactionTypeContext.jsx";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import SignUp from './SignUp/SignUp.jsx'
import Login from './Login/Login.jsx'
import Home from './Home/Home.jsx'

import { lazy, Suspense } from 'react';

const Month = lazy(() => import("./components/Month.jsx"));
const NewTransaction = lazy(() => import("./components/NewTransaction.jsx"));
const Accounts = lazy(() => import("./components/Accounts.jsx"));
const CreditCards = lazy(() => import("./components/CreditCards.jsx"));
const NewExpenseOrRevenueType = lazy(() => import("./components/NewExpenseOrRevenueType.jsx"));
const CreateAccount = lazy(() => import("./components/CreateAccount.jsx"));
const LoggedInLayout = lazy(() => import("./components/LoggedInLayout.jsx"));

import LoadingWrapper from './wrappers/LoadingWrapper.jsx';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Carregando página...</div>}>
        <AuthProvider>
          <TransactionTypeProvider>
          <Routes>
            <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>}/>
            <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/home" element={<PublicRoute><Home/></PublicRoute>}></Route>

            <Route path="/" element={<ProtectedRoute><EyeProvider><LoggedInLayout/></EyeProvider></ProtectedRoute>}> 
              <Route path="/month" element={<Month/>}/>
              <Route path="/newtransaction" element={
                <LoadingWrapper children={
                  <NewTransaction/>
                }>
                </LoadingWrapper>
              }/>
              <Route path="/accounts" element={<Accounts/>} />
              <Route path="create-account" element={<CreateAccount/>} />
              <Route path="/credit-cards" element={<CreditCards/>}/>
              <Route path="/new-expense-or-revenue-type" element={<NewExpenseOrRevenueType/>}/>
            </Route>

          </Routes>
          </TransactionTypeProvider>
        </AuthProvider>
      </Suspense>
    </Router>
  )
}
export default App
