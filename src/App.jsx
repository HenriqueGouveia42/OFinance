
import { EyeProvider } from './contexts/EyeContext.jsx';
import { TransactionTypeProvider } from "./contexts/TransactionTypeContext.jsx";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { lazy, Suspense } from 'react';

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import Login from './Login/Login.jsx'
import Home from './Home/Home.jsx'

const Month = lazy(() => import("./components/Month.jsx"));
const NewTransaction = lazy(() => import("./components/NewTransaction.jsx"));
const Accounts = lazy(() => import("./components/Accounts.jsx"));
const CreditCards = lazy(() => import("./components/CreditCards.jsx"));
const CreateAccount = lazy(() => import("./components/CreateAccount.jsx"));
const LoggedInLayout = lazy(() => import("./components/LoggedInLayout.jsx"));
const Categories = lazy(() => import("./components/Categories.jsx"));
const CreateCategory = lazy(() => import("./components/CreateCategory.jsx"));

import LoadingWrapper from './wrappers/LoadingWrapper.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Carregando página...</div>}>
            <TransactionTypeProvider>
            <Routes>
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
                <Route path="/create-account" element={<CreateAccount/>} />
                <Route path="/categories" element={<Categories/>} />
                <Route path="/create-category" element={<CreateCategory/>} />
                <Route path="/credit-cards" element={<CreditCards/>}/>
              </Route>
            </Routes>
            </TransactionTypeProvider>
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

export default App