
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupForm from './pages/signUp'
import SigninForm from './pages/signIn'
import { Dashboard } from './pages/dashboard'

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignupForm/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signup' element={<SigninForm/>}></Route>
      </Routes>
    </BrowserRouter>
  ) 

}

export default App
