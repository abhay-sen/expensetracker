import SignInPage from "./components/SignInPage"
import{Routes,Route} from "react-router-dom"
import "./../public/styles/App.css"
import CreateExpense from "./components/CreateExpense"
import Dashboard from "./components/Dashboard"

import NameForm from "./components/NameForm"
import { ThemeProvider } from "@emotion/react"
import theme from "./config/theme"
import UserProfile from "./components/UserProfile"


function App(){
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={"/"} element={<SignInPage />} />
          <Route path={"/create_expense"} element={<CreateExpense />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/UserProfile"} element={<UserProfile/>}/>
          <Route path={"/NameForm"} element={<NameForm />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
export default App