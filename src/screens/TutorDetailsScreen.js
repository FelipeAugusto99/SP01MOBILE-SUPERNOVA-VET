import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { excluirTutor } from '../services/tutoresService';

export default function TutorDetailsScreen({
  route,
  navigation,
}) {
  const { tutor } = route.params;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => excluirTutor(tutor.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tutores'],
      });

      navigation.goBack();
    },

    onError: (error) => {
      if (error.response?.status === 409) {
        Alert.alert(
          'Não é possível excluir',
          'Este tutor possui pets vinculados. Remova ou altere os pets antes de excluir o tutor.'
        );
      } else if (error.response?.status === 403) {
        Alert.alert(
          'Sem permissão',
          'Apenas usuários administradores podem excluir tutores.'
        );
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível excluir o tutor.'
        );
      }
    },
  });

  function deletarTutor() {
    Alert.alert(
      'Excluir Tutor',
      `Tem certeza que deseja excluir ${tutor.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            mutation.mutate();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.icone}>
        <Text style={styles.iconeTexto}>
          {tutor.nome?.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.nome}>
        {tutor.nome}
      </Text>

      <Text style={styles.perfil}>
        {tutor.perfil || 'Tutor'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          E-mail
        </Text>

        <Text style={styles.valor}>
          {tutor.email}
        </Text>

        <Text style={styles.label}>
          Telefone
        </Text>

        <Text style={styles.valor}>
          {tutor.telefone}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() =>
          navigation.navigate('TutorForm', {
            tutor,
          })
        }
        disabled={mutation.isPending}
      >
        <Text style={styles.textoBotaoEditar}>
          Editar Tutor
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={deletarTutor}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="#D32F2F" />
        ) : (
          <Text style={styles.textoBotaoExcluir}>
            Excluir Tutor
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        disabled={mutation.isPending}
      >
        <Text style={styles.textoBotaoVoltar}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5FF',
    padding: 25,
    alignItems: 'center',
  },

  icone: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },

  iconeTexto: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#6C63FF',
  },

  nome: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#29254A',
    textAlign: 'center',
  },

  perfil: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  label: {
    fontSize: 11,
    color: '#9995AA',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  valor: {
    fontSize: 16,
    color: '#403B5C',
    marginBottom: 20,
  },

  botaoEditar: {
    width: '100%',
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  textoBotaoEditar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoExcluir: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  textoBotaoExcluir: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoVoltar: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});