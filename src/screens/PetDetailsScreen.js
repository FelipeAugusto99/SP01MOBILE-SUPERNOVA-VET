import { useState } from 'react';

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
  const { pet } = route.params;

  const [excluindo, setExcluindo] = useState(false);

  function getEmoji(especie) {
    if (especie?.toLowerCase() === 'gato') {
      return '🐱';
    }

    return '🐶';
  }

  function getCorRisco(nivelRisco) {
    if (nivelRisco === 'ALTO') {
      return '#E53935';
    }

    if (nivelRisco === 'MEDIO') {
      return '#F9A825';
    }

    return '#43A047';
  }

  function deletarPet() {
    Alert.alert(
      'Excluir Pet',
      `Tem certeza que deseja excluir ${pet.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          async onPress() {
            try {
              setExcluindo(true);

              await excluirPet(pet.id);

              navigation.goBack();
            } catch (error) {
              if (error.response?.status === 403) {
                Alert.alert(
                  'Sem permissão',
                  'Apenas usuários administradores podem excluir pets.'
                );
              } else {
                Alert.alert(
                  'Erro',
                  'Não foi possível excluir o pet.'
                );
              }
            } finally {
              setExcluindo(false);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.icone}>
        <Text style={styles.emoji}>
          {getEmoji(pet.especie)}
        </Text>
      </View>

      <Text style={styles.nome}>
        {pet.nome}
      </Text>

      <View
        style={[
          styles.risco,
          {
            backgroundColor: getCorRisco(
              pet.nivelRisco
            ),
          },
        ]}
      >
        <Text style={styles.riscoTexto}>
          Risco {pet.nivelRisco}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Espécie
        </Text>

        <Text style={styles.valor}>
          {pet.especie}
        </Text>

        <Text style={styles.label}>
          Idade
        </Text>

        <Text style={styles.valor}>
          {pet.idade} anos
        </Text>

        <Text style={styles.label}>
          Tutor
        </Text>

        <Text style={styles.valor}>
          {pet.tutor?.nome || 'Não informado'}
        </Text>

        <Text style={styles.label}>
          E-mail do tutor
        </Text>

        <Text style={styles.valor}>
          {pet.tutor?.email || 'Não informado'}
        </Text>

        <Text style={styles.label}>
          Telefone do tutor
        </Text>

        <Text style={styles.valor}>
          {pet.tutor?.telefone || 'Não informado'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() =>
          navigation.navigate('PetForm', {
            pet,
          })
        }
      >
        <Text style={styles.textoBotaoEditar}>
          Editar Pet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={deletarPet}
        disabled={excluindo}
      >
        {excluindo ? (
          <ActivityIndicator color="#D32F2F" />
        ) : (
          <Text style={styles.textoBotaoExcluir}>
            Excluir Pet
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
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

  emoji: {
    fontSize: 45,
  },

  nome: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#29254A',
    textAlign: 'center',
  },

  risco: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 25,
  },

  riscoTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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