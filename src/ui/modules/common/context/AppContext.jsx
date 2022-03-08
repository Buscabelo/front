import { createContext, useCallback, useState, useEffect } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const token = localStorage.getItem('@buscabelo_client/token');

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
  });

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <AppContext.Provider
      value={{
        categories,
        user,
        token
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
