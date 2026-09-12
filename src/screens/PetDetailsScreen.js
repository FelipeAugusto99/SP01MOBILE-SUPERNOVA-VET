import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { excluirPet } from '../services/petsService';

export default function PetDetailsScreen({ route, navigation }) {
  const pet = route.params?.pet;

  const queryClient = useQueryClient();

  const [erro, setErro] = React.useState('');

  const mutation = useMutation({
    mutationFn: () => excluirPet(pet.id),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['pets'],
        }),

        queryClient.invalidateQueries({
          queryKey: ['resumo-risco'],
        }),

        queryClient.invalidateQueries({
          queryKey: ['pets-criticos'],
        }),
      ]);

      navigation.goBack();
    },

    onError: (error) => {
      if (error.response?.status === 403) {
        setErro(
          'Você não tem permissão para excluir este pet.'
        );
      } else {
        setErro(
          'Não foi possível excluir o pet.'
        );
      }
    },
  });

  function confirmarExclusao() {
    Alert.alert(
      'Excluir pet',
      `Tem certeza que deseja excluir ${pet.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setErro('');
            mutation.mutate();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icone}>
          <Text style={styles.emoji}>
            {pet.especie?.toLowerCase() === 'gato'
              ? '🐱'
              : '🐶'}
          </Text>
        </View>

        <Text style={styles.nome}>
          {pet.nome}
        </Text>

        <Text style={styles.info}>
          Espécie: {pet.especie}
        </Text>

        <Text style={styles.info}>
          Idade: {pet.idade} anos
        </Text>

        <Text style={styles.info}>
          Nível de risco: {pet.nivelRisco}
        </Text>

        <Text style={styles.info}>
          Tutor: {pet.tutor?.nome || 'Não informado'}
        </Text>
      </View>

      {erro ? (
        <Text style={styles.erro}>
          {erro}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() =>
          navigation.navigate('PetForm', {
            pet,
          })
        }
        disabled={mutation.isPending}
      >
        <Text style={styles.textoBotaoEditar}>
          Editar pet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={confirmarExclusao}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotaoExcluir}>
            Excluir pet
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5FF',
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  icone: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  emoji: {
    fontSize: 40,
  },

  nome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#29254A',
    marginBottom: 20,
  },

  info: {
    width: '100%',
    fontSize: 15,
    color: '#55516A',
    marginBottom: 10,
  },

  erro: {
    color: '#D32F2F',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 15,
  },

  botaoEditar: {
    backgroundColor: '#6C63FF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  textoBotaoEditar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  botaoExcluir: {
    backgroundColor: '#D32F2F',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoExcluir: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});