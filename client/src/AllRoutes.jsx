import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Recipes from './Components/Recipes'
import Fav from './Components/Fav'

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Recipes />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/fav' element={<Fav />}/>
      </Routes>
    </div>
  )
}
