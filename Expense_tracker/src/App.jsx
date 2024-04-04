import SignInPage from "./components/SignInPage"
import{Routes,Route} from "react-router-dom"
import "./../public/styles/App.css"
import CreateExpense from "./components/CreateExpense"
function App(){
  return (<div>
    <Routes>
      <Route path={"/"} element={<SignInPage/>}/> 
      <Route path={"/create_expense"} element={<CreateExpense/>}/>
    </Routes>
    
    
  </div>)
}
export default App