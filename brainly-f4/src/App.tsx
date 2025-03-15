
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupForm from './pages/signUp'
import SigninForm from './pages/signIn'
import { WellCome } from './pages/WellCome'
import { Dashboard } from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import { NotFound } from './components/Nothing'




function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WellCome/>}></Route>
        <Route path='/signup' element={<SignupForm/>}></Route>
        <Route path='/signin' element={<SigninForm/>}></Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>     
      </Routes>
    </BrowserRouter>
  ) 

}

export default App
