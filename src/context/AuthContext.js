import { createContext, useContext, useState } from 'react';
import {
    configurarAutenticacao,
    limparAutenticacao,
} from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  function login(username, password) {
    configurarAutenticacao(username, password);

    setUsuario({
      username,
      password,
    });
  }

  function logout() {
    limparAutenticacao();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}