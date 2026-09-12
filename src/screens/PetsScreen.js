import { useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { listarPets } from '../services/petsService';

export default function PetsScreen({ navigation }) {
  const {
    data: pets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pets'],
    queryFn: listarPets,
  });

  if (isLoading) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.carregando}>
          Carregando pets...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centralizado}>
        <Text style={styles.erro}>
          Não foi possível carregar os pets.
        </Text>

        <TouchableOpacity
          style={styles.botaoTentar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoTentar}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View>
          <Text style={styles.titulo}>
            Pets
          </Text>

          <Text style={styles.subtitulo}>
            Gerencie os animais cadastrados
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => navigation.navigate('PetForm')}
        >
          <Text style={styles.textoAdicionar}>
            + Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('PetDetails', {
                pet: item,
              })
            }
          >
            <View style={styles.icone}>
              <Text style={styles.emoji}>
                {item.especie?.toLowerCase() === 'gato'
                  ? '🐱'
                  : '🐶'}
              </Text>
            </View>

            <View style={styles.informacoes}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.detalhes}>
                {item.especie} • {item.idade} anos
              </Text>

              <Text style={styles.tutor}>
                Tutor: {item.tutor?.nome || 'Não informado'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum pet cadastrado.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5FF',
    padding: 20,
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#29254A',
  },

  subtitulo: {
    fontSize: 13,
    color: '#88849B',
    marginTop: 4,
  },

  botaoAdicionar: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  textoAdicionar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  lista: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',

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
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  emoji: {
    fontSize: 28,
  },

  informacoes: {
    flex: 1,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#29254A',
    marginBottom: 4,
  },

  detalhes: {
    fontSize: 13,
    color: '#6C63FF',
    marginBottom: 4,
  },

  tutor: {
    fontSize: 12,
    color: '#88849B',
  },

  vazio: {
    textAlign: 'center',
    color: '#88849B',
    marginTop: 40,
    fontSize: 14,
  },

  centralizado: {
    flex: 1,
    backgroundColor: '#F6F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  carregando: {
    marginTop: 10,
    color: '#6C63FF',
    fontSize: 14,
  },

  erro: {
    color: '#D32F2F',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
  },

  botaoTentar: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  textoBotaoTentar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});