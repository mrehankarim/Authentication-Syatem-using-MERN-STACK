import React,{useState} from 'react'

const Signup = () => {
    const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleSubmit = async (e) => {
    try {
      e.preventDefault() 

      const response = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          fullName: firstName + " " + lastName,
          password
        })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
      alert("Error", error)
    }
  }
  return (
    <>
      <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='w-[60%] h-[90vh] flex flex-col gap-2 justify-center items-center shadow-xl rounded-3xl bg-slate-900 text-white'>
          <h2 className='text-4xl font-bold font-mono'>Sign Up</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type="text"
              placeholder='Enter First Name'
              className='outline-none border-2 border-slate-200 py-3 px-6 rounded-md'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder='Enter Last Name'
              className='outline-none border-2 border-slate-200 py-3 px-6 rounded-md'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Enter your username'
              className='outline-none border-2 border-slate-200 py-3 px-6 rounded-md'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <button type="submit" className='outline-1 font-semibold py-2 rounded-2xl hover:bg-white hover:text-slate-900'>
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
