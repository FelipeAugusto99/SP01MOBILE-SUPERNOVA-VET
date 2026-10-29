import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.2:8080',
  timeout: 10000,
});

export function configurarAutenticacao(username, password) {
  api.defaults.auth = { username, password };
}

export function limparAutenticacao() {
  delete api.defaults.auth;
}

export function registrarInterceptadorNaoAutorizado(aoNaoAutorizar) {
  const id = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && api.defaults.auth) {
        aoNaoAutorizar();
      }

      return Promise.reject(error);
    }
  );

  return () => api.interceptors.response.eject(id);
}

export default api;
