import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  atualizarTutor,
  criarTutor,
  excluirTutor,
  listarTutores,
} from '../services/tutoresService';

export const tutoresKeys = {
  todos: ['tutores'],
  lista: ['tutores', 'lista'],
};

function useInvalidarTutores() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: tutoresKeys.todos,
    });
}

export function useTutores() {
  return useQuery({
    queryKey: tutoresKeys.lista,
    queryFn: listarTutores,
  });
}

export function useTutor(tutorId) {
  return useQuery({
    queryKey: tutoresKeys.lista,
    queryFn: listarTutores,
    select: (tutores) => tutores.find((tutor) => tutor.id === tutorId),
  });
}

export function useSalvarTutor(tutorId) {
  const invalidarTutores = useInvalidarTutores();

  return useMutation({
    mutationFn: (dadosTutor) =>
      tutorId
        ? atualizarTutor(tutorId, dadosTutor)
        : criarTutor(dadosTutor),
    onSuccess: invalidarTutores,
  });
}

export function useExcluirTutor() {
  const invalidarTutores = useInvalidarTutores();

  return useMutation({
    mutationFn: (tutorId) => excluirTutor(tutorId),
    onSuccess: invalidarTutores,
  });
}
