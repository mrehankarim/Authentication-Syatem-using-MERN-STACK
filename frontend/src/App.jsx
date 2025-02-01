import React, {  useState } from 'react'
import {createBrowserRouter,RouterProvider}from 'react-router-dom' 
import Signup from './Pages/Signup'
const App = () => {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Signup/>
    }
  ])
  return(
  <>
  <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
