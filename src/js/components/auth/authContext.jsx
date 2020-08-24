import React, { createContext, useReducer } from 'react';
import AuthReducer from './authReducer';

const AuthContext = createContext();

export const initialState = {
  isAuth: false,
  access_token: '',
  role: '',
  firstname: '',
  lastname: '',
  email: '',
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
