import React, { useState, memo, createContext, useEffect } from "react"


export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(true)


  useEffect(()=> {
    auth()
  }, [])

  function auth() {
    setTimeout(() => {
      setIsAuthenticated(true)
      setIsCheckingAuthentication(false)
    }, 3000);
  }

  function logout() {
    localStorage.removeItem("@buscabelo-estabelecimento/token")
    localStorage.removeItem("@buscabelo-estabelecimento/me")
    setIsAuthenticated(false)
    setIsCheckingAuthentication(false)

  }


  return(
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isCheckingAuthentication,
        logout,
        auth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
