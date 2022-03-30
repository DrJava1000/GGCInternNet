import { createContext } from 'react';

const AuthContext = createContext
(
  {
    currentUserID: ''
  }
);

export default AuthContext;