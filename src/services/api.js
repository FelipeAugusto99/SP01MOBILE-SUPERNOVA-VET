import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.2:8080',
  timeout: 10000,
});

export function configurarAutenticacao(username, password) {
  api.defaults.auth = { username, password };
}

export function limparAutenticacao() {
  delete api.defaults.auth;
}

export default api;