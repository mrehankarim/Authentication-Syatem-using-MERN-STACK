import React,{useContext, useEffect, useState} from 'react'
import { Link,useNavigate,Navigate } from 'react-router-dom'
import { loginContext } from './component/contextapi'
const Login = () => {
  const navigate=useNavigate()
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {loggedIn,setLoggedIn}=useContext(loginContext)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault() 

      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials:"include"
      })
      const data = await response.json()
      if(data.success)
      {
        setLoggedIn(true)
        navigate("/book")
        console.log(data)
      }
      
    } catch (error) {
      console.log(error)
      alert("Error", error)
    }
  }
  return (
    <>
      <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='w-[60%] h-[90vh] flex flex-col  justify-center items-center gap-9 shadow-xl rounded-3xl bg-slate-900 text-white'>
          <h2 className='text-4xl font-bold font-mono'>Login</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
           
            <input
              type="email"
              placeholder='Enter your email'
              className='outline-none border-2 border-slate-200 py-3 px-6 rounded-md'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Enter your password'
              className='outline-none border-2 border-slate-200 py-3 px-6 rounded-md'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className='outline-1 font-semibold py-2 rounded-2xl hover:bg-white hover:text-slate-900 mt-2'>
              Login
            </button>
            <Link to="/"><p className='text-center text-blue-600 underline'>Not registred yet</p></Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
