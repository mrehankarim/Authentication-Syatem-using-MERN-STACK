import React from 'react'
import {createBrowserRouter,RouterProvider}from 'react-router-dom' 
import Signup from './Pages/Signup'
import Login from './Pages/Login'
const App = () => {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])
  return(
  <>
  <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
