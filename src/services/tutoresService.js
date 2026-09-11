import api from './api';

export async function listarTutores() {
  const response = await api.get('/tutores');
  return response.data;
}

export async function buscarTutor(id) {
  const response = await api.get(`/tutores/${id}`);
  return response.data;
}

export async function criarTutor(tutor) {
  const response = await api.post('/tutores', tutor);
  return response.data;
}

export async function atualizarTutor(id, tutor) {
  const response = await api.put(`/tutores/${id}`, tutor);
  return response.data;
}

export async function excluirTutor(id) {
  await api.delete(`/tutores/${id}`);
}