import { useEffect, useRef } from 'react';

import { useAuth } from '../context/AuthContext';
import {
  notificarPetCritico,
  ouvirToqueNotificacao,
  prepararNotificacoes,
} from '../services/notificacoesService';
import {
  carregarCriticosNotificados,
  salvarCriticosNotificados,
} from '../services/petsCriticosStorage';
import { identificarNovosCriticos } from '../utils/pets';
import { usePetsCriticos } from './usePets';

const INTERVALO_VERIFICACAO = 30 * 1000;

export function useMonitorPetsCriticos(aoAbrirPet) {
  const { usuario } = useAuth();
  const verificacaoAnterior = useRef(Promise.resolve());

  const { data: petsCriticos } = usePetsCriticos({
    refetchInterval: INTERVALO_VERIFICACAO,
  });

  useEffect(() => {
    prepararNotificacoes().catch(() => {});
  }, []);

  useEffect(
    () =>
      ouvirToqueNotificacao((dados) => {
        if (dados?.tipo === 'PET_CRITICO' && dados.pet) {
          aoAbrirPet(dados.pet);
        }
      }),
    [aoAbrirPet]
  );

  useEffect(() => {
    if (!petsCriticos) {
      return;
    }

    verificacaoAnterior.current = verificacaoAnterior.current.then(async () => {
      try {
        const notificados = await carregarCriticosNotificados(usuario.username);

        if (notificados) {
          const novos = identificarNovosCriticos(notificados, petsCriticos);

          for (const pet of novos) {
            await notificarPetCritico(pet);
          }
        }

        await salvarCriticosNotificados(
          usuario.username,
          petsCriticos.map((pet) => pet.id)
        );
      } catch {
      }
    });
  }, [petsCriticos, usuario.username]);
}
