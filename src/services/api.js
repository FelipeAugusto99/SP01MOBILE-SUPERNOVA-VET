import axios from 'axios';

const api = axios.create({
  baseURL: 'http://26.184.67.225:8080',
});

export function configurarAutenticacao(username, password) {
  api.defaults.auth = {
    username,
    password,
  };
}

export function limparAutenticacao() {
  delete api.defaults.auth;
}

export default api;