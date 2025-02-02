import React, { useState } from 'react'
import {createBrowserRouter,RouterProvider}from 'react-router-dom' 
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Book from './Pages/Book'
import {Contextapi} from './Pages/component/contextapi'
import ProtectRoute from './Pages/component/ProtectRoute'
const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/book",
      element:<ProtectRoute><Book/></ProtectRoute>
    }

  ])
  return(
  <>
  <Contextapi>
  <RouterProvider router={router}></RouterProvider>
  </Contextapi>
    </>
  )
}

export default App
