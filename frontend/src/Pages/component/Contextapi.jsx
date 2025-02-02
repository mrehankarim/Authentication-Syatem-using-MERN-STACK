import React,{useState,createContext} from 'react'
const loginContext=createContext()
const Contextapi = ({children}) => {

    const [loggedIn,setLoggedIn]=useState(false)
    
  return (
    <>
      <loginContext.Provider value={{loggedIn,setLoggedIn}}>
        {children}
      </loginContext.Provider>
    </>
  )
}

export {Contextapi,loginContext} 
