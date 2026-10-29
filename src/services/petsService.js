import api from './api';

export async function listarPets() {
  const response = await api.get('/pets');
  return response.data;
}

export async function buscarPet(id) {
  const response = await api.get(`/pets/${id}`);
  return response.data;
}

export async function criarPet(pet) {
  const response = await api.post('/pets', pet);
  return response.data;
}

export async function atualizarPet(id, pet) {
  const response = await api.put(`/pets/${id}`, pet);
  return response.data;
}

export async function excluirPet(id) {
  await api.delete(`/pets/${id}`);
}

export async function listarPetsCriticos() {
  const response = await api.get('/pets/criticos');
  return response.data;
}

export async function listarMeusPets() {
  const response = await api.get('/pets/meus');
  return response.data;
}
