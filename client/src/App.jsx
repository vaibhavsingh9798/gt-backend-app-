import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import HomeNavbar from './components/Home/HomeNavbar'
import Home from './components/Home/Home'


function App() {


  return (
    <>
    <HomeNavbar />
     <Routes>
      <Route  path='/home'  element={ <Home />} />
      <Route path='/signup' element={ <Signup />} />
      <Route path='/login' element={ <Login />} />
     </Routes>
  
     </>
  )
}

export default App
