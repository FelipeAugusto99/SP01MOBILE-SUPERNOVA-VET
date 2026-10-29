import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  atualizarPet,
  criarPet,
  excluirPet,
  listarMeusPets,
  listarPets,
  listarPetsCriticos,
} from '../services/petsService';
import { filtrarPorRisco } from '../utils/pets';
import { usePermissoes } from './usePermissoes';

export const petsKeys = {
  todos: ['pets'],
  lista: ['pets', 'lista'],
  criticos: ['pets', 'criticos'],
  meus: ['pets', 'meus'],
};

function useConsultaPets() {
  const { verTodosPets } = usePermissoes();

  return verTodosPets
    ? { queryKey: petsKeys.lista, queryFn: listarPets }
    : { queryKey: petsKeys.meus, queryFn: listarMeusPets };
}

function useInvalidarPets() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: petsKeys.todos,
    });
}

export function usePets() {
  return useQuery(useConsultaPets());
}

export function usePet(petId) {
  return useQuery({
    ...useConsultaPets(),
    select: (pets) => pets.find((pet) => pet.id === petId),
  });
}

export function usePetsCriticos() {
  const { verTodosPets } = usePermissoes();

  return useQuery(
    verTodosPets
      ? { queryKey: petsKeys.criticos, queryFn: listarPetsCriticos }
      : {
          queryKey: petsKeys.meus,
          queryFn: listarMeusPets,
          select: (pets) => filtrarPorRisco(pets, 'ALTO'),
        }
  );
}

export function useSalvarPet(petId) {
  const invalidarPets = useInvalidarPets();

  return useMutation({
    mutationFn: (dadosPet) =>
      petId
        ? atualizarPet(petId, dadosPet)
        : criarPet(dadosPet),
    onSuccess: invalidarPets,
  });
}

export function useExcluirPet() {
  const invalidarPets = useInvalidarPets();

  return useMutation({
    mutationFn: (petId) => excluirPet(petId),
    onSuccess: invalidarPets,
  });
}
