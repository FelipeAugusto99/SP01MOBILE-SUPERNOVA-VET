import api from './api';

export async function listarPets() {
  const response = await api.get('/pets');

  console.log('===== GET /pets =====');
  console.log('Pets recebidos da API:', JSON.stringify(response.data, null, 2));

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
  console.log('===== PUT /pets =====');
  console.log('ID:', id);
  console.log('Dados enviados:', JSON.stringify(pet, null, 2));

  const response = await api.put(`/pets/${id}`, pet);

  console.log('===== RESPOSTA DO PUT =====');
  console.log('Resposta:', JSON.stringify(response.data, null, 2));

  return response.data;
}

export async function excluirPet(id) {
  await api.delete(`/pets/${id}`);
}