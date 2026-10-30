export const NIVEIS_RISCO = ['BAIXO', 'MEDIO', 'ALTO'];

export const IDADE_RISCO_MEDIO = 4;
export const IDADE_RISCO_ALTO = 7;

export function calcularRiscoPorIdade(idade) {
  const idadeNumero = Number(idade);

  if (idade === '' || !Number.isInteger(idadeNumero) || idadeNumero < 0) {
    return null;
  }

  if (idadeNumero >= IDADE_RISCO_ALTO) {
    return 'ALTO';
  }

  if (idadeNumero >= IDADE_RISCO_MEDIO) {
    return 'MEDIO';
  }

  return 'BAIXO';
}

export function obterEmojiEspecie(especie) {
  return especie?.toLowerCase().trim() === 'gato'
    ? '🐱'
    : '🐶';
}

export function filtrarPorRisco(pets, nivelRisco) {
  if (!nivelRisco) {
    return pets;
  }

  return pets.filter((pet) => pet.nivelRisco === nivelRisco);
}

export function identificarNovosCriticos(idsNotificados, petsCriticos) {
  return petsCriticos.filter((pet) => !idsNotificados.includes(pet.id));
}

export function validarPet({ nome, idade, especie, tutor }) {
  if (!nome.trim() || !idade || !especie.trim()) {
    return 'Preencha todos os campos.';
  }

  const idadeNumero = Number(idade);

  if (!Number.isInteger(idadeNumero) || idadeNumero < 0 || idadeNumero > 30) {
    return 'A idade deve ser um número inteiro entre 0 e 30.';
  }

  if (!tutor) {
    return 'Selecione um tutor.';
  }

  return null;
}

export function montarDadosPet({ nome, idade, especie, tutor }) {
  return {
    nome: nome.trim(),
    idade: Number(idade),
    especie: especie.trim(),
    nivelRisco: calcularRiscoPorIdade(idade),
    tutor: {
      id: tutor.id,
      nome: tutor.nome,
      email: tutor.email,
      telefone: tutor.telefone,
    },
  };
}
