import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(true);

  function auth() {
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsCheckingAuthentication(false);
    }, 3000);
  }

  useEffect(() => {
    auth();
  }, []);

  function logout() {
    localStorage.removeItem('@buscabelo-estabelecimento/token');
    localStorage.removeItem('@buscabelo-estabelecimento/me');
    setIsAuthenticated(false);
    setIsCheckingAuthentication(false);
  }

  return (
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
  );
}

export default AuthContextProvider;
