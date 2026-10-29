import { useAuth } from '../context/AuthContext';
import { obterPermissoes } from '../utils/permissoes';

export function usePermissoes() {
  const { usuario } = useAuth();
  return obterPermissoes(usuario?.perfil);
}
