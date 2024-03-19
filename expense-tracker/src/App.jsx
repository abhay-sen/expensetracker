
import './App.css'
import {Routes,Route} from  'react-router-dom';
import SignInPage from './components/pages/SignInPage';
function App(){
  return (
    
      <Routes>
        <Route path="/" element={<SignInPage/>}/>
      </Routes>
    
  )
}

export default App;
