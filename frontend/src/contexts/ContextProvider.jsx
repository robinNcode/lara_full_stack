import {createContext, useContext, useState} from "react";

const stateContext = createContext(
  {
    currentUser: null,
    token: null,
    setCurrentUser: () => {},
    setToken: () => {}
  }
);

/**
 * ContextProvider is a wrapper component that provides the state to all the components in the app.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  /**
   * setToken sets the token in the state and also in the local storage.
   * @param token
   */
  const setToken = (token) => {
    _setToken(token);
    if(token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    }
    else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <stateContext.Provider value={{currentUser, setCurrentUser, token, setToken}}>
      {children}
    </stateContext.Provider>
  );
}

export const useStateContext = () => useContext(stateContext)
