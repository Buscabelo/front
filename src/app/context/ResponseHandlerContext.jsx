import { message } from 'antd';
import { createContext } from 'react';
import { useHistory } from 'react-router-dom';

export const ResponseHandlerContext = createContext();

export function ResponseHandlerProvider({children}) {
  const history = useHistory();

  // toda logica de criar o reqOptions pode ser separada em uma funcao
  async function query({link, method, auth, body}) {

    let reqOptions = { method };
    const headers = new Headers();

    if (body) {
      headers.append('Content-Type', 'application/json');
      reqOptions = { ...reqOptions, body };
    }

    if (auth) {
      const token = await JSON.parse(localStorage.getItem('@buscabelo-estabelecimento/token') || 'null');

      // pode ser separado em metodo deny() em authcontext
      if (!token) {
        history.push('/sessions');
        return { response: null, statusCode: 401 };
      }

      headers.append('Authorization', `Bearer ${token}`);
    }

    reqOptions = { ...reqOptions, headers };

    return fetch(link, reqOptions)
      .then(async res => {
        try {
          return {response: await res.json(), statusCode: res.status};
        } catch (error) {
          return {response: null, statusCode: res.status};
        }
      })
      .catch(err => ({response: null, statusCode: err.status}));
  }

  // deve ser retirado daqui
  function responseMessage({errMessage, sucMessage, statusCode}) {
    switch (statusCode) {
    case 200:
      message.info(sucMessage || 'Sucesso!');
      break;
    case 201:
      message.success(sucMessage || 'Sucesso!');
      break;
    case 400:
      message.warning(errMessage || 'Algo de errado ocorreu');
      break;
    case 401:
      history.push('/sessions');
      break;
    default:
      break;
    }
  }

  return (
    <ResponseHandlerContext.Provider
      value={{
        query,
        responseMessage
      }}
    >
      {children}
    </ResponseHandlerContext.Provider>
  );
}
