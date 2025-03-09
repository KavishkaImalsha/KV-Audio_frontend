import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainHome from './pages/MainHome.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainHome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
