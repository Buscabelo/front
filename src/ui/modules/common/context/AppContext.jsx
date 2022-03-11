import { createContext, useCallback, useState, useEffect } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [needLoad, setNeedLoad] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/services/types`);
      const { success, types } = await response.json();

      if (success) {
        setCategories(types);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const reloadAuth = () => {
    setNeedLoad(true);
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (needLoad) {
      const _user = JSON.parse(localStorage.getItem('@buscabelo/user'));
      setUser(_user);
      const _token = localStorage.getItem('@buscabelo/token');
      setToken(_token);
      setNeedLoad(false);
    }
  }, [needLoad]);

  return (
    <AppContext.Provider
      value={{
        categories,
        user,
        token,
        reloadAuth
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
