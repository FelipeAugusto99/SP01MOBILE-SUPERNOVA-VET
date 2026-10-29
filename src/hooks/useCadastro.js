import { useMutation } from '@tanstack/react-query';

import { useAuth } from '../context/AuthContext';
import { cadastrarUsuario } from '../services/authService';

export function useCadastro() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (dadosUsuario) => {
      await cadastrarUsuario(dadosUsuario);
      await login(dadosUsuario.email, dadosUsuario.senha);
    },
  });
}
