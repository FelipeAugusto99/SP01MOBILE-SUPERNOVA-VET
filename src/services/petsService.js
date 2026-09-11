import api from './api';

export async function listarPets() {
    const response = await api.get('/pets');
    return response.data;
}