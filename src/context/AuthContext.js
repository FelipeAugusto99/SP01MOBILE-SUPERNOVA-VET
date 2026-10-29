import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  configurarAutenticacao,
  limparAutenticacao,
  registrarInterceptadorNaoAutorizado,
} from '../services/api';
import { buscarUsuarioLogado } from '../services/authService';
import {
  carregarSessao,
  removerSessao,
  salvarSessao,
} from '../services/sessaoStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const [usuario, setUsuario] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    async function restaurarSessao() {
      try {
        const sessao = await carregarSessao();

        if (sessao) {
          configurarAutenticacao(sessao.username, sessao.password);
          setUsuario(sessao);
        }
      } catch {
        await removerSessao();
      } finally {
        setCarregandoSessao(false);
      }
    }

    restaurarSessao();
  }, []);

  const logout = useCallback(async () => {
    limparAutenticacao();
    setUsuario(null);
    queryClient.clear();
    await removerSessao();
  }, [queryClient]);

  useEffect(
    () => registrarInterceptadorNaoAutorizado(logout),
    [logout]
  );

  async function login(username, password) {
    const dadosUsuario = await buscarUsuarioLogado(username, password);

    const sessao = {
      username,
      password,
      perfil: dadosUsuario.perfil,
    };

    configurarAutenticacao(username, password);
    await salvarSessao(sessao);
    setUsuario(sessao);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregandoSessao,
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
