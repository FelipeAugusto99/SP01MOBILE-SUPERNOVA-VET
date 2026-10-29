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
