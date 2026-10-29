import api from './api';

export async function buscarUsuarioLogado(username, password) {
  const response = await api.get('/auth/me', {
    auth: {
      username,
      password,
    },
  });

  return response.data;
}

export async function cadastrarUsuario(dadosUsuario) {
  const response = await api.post('/auth/register', dadosUsuario);

  return response.data;
}
