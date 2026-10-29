import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  atualizarPet,
  criarPet,
  excluirPet,
  listarPets,
  listarPetsCriticos,
} from '../services/petsService';

export const petsKeys = {
  todos: ['pets'],
  lista: ['pets', 'lista'],
  criticos: ['pets', 'criticos'],
};

function useInvalidarPets() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: petsKeys.todos,
    });
}

export function usePets() {
  return useQuery({
    queryKey: petsKeys.lista,
    queryFn: listarPets,
  });
}

export function usePetsCriticos() {
  return useQuery({
    queryKey: petsKeys.criticos,
    queryFn: listarPetsCriticos,
  });
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
