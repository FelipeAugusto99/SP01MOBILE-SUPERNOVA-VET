import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
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
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarPets() {
    try {
      setCarregando(true);
      setErro('');

      const dados = await listarPets();
      setPets(dados);
    } catch (error) {
      setErro('Não foi possível carregar os pets.');
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarPets();
    }, [])
  );

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

  function renderPet({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('PetDetails', {
            pet: item,
          })
        }
      >
        <View style={styles.cardTopo}>
          <View style={styles.petInfo}>
            <View style={styles.icone}>
              <Text style={styles.emoji}>
                {getEmoji(item.especie)}
              </Text>
            </View>

            <View>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.especie}>
                {item.especie} • {item.idade} anos
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.risco,
              {
                backgroundColor: getCorRisco(
                  item.nivelRisco
                ),
              },
            ]}
          >
            <Text style={styles.riscoTexto}>
              {item.nivelRisco}
            </Text>
          </View>
        </View>

        <View style={styles.linha} />

        <Text style={styles.tutorTitulo}>
          Tutor
        </Text>

        <Text style={styles.tutorNome}>
          {item.tutor?.nome || 'Não informado'}
        </Text>

        <Text style={styles.tutorEmail}>
          {item.tutor?.email || 'E-mail não informado'}
        </Text>

        <Text style={styles.verDetalhes}>
          Toque para ver detalhes →
        </Text>
      </TouchableOpacity>
    );
  }

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator
          size="large"
          color="#6C63FF"
        />

        <Text style={styles.carregando}>
          Carregando pets...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centralizado}>
        <Text style={styles.erro}>
          {erro}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>
            Meus Pets
          </Text>

          <Text style={styles.subtitulo}>
            Animais cadastrados no sistema
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() =>
            navigation.navigate('PetForm')
          }
        >
          <Text style={styles.textoBotaoAdicionar}>
            + Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contador}>
        <Text style={styles.numero}>
          {pets.length}
        </Text>

        <Text style={styles.contadorTexto}>
          pets
        </Text>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPet}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5FF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#29254A',
  },

  subtitulo: {
    fontSize: 14,
    color: '#77738F',
    marginTop: 4,
  },

  botaoAdicionar: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  textoBotaoAdicionar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  contador: {
    backgroundColor: '#6C63FF',
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 14,
  },

  numero: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  contadorTexto: {
    color: '#fff',
    fontSize: 11,
  },

  lista: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  icone: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  emoji: {
    fontSize: 27,
  },

  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#29254A',
  },

  especie: {
    fontSize: 13,
    color: '#77738F',
    marginTop: 4,
  },

  risco: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  riscoTexto: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  linha: {
    height: 1,
    backgroundColor: '#EEEEF4',
    marginVertical: 15,
  },

  tutorTitulo: {
    fontSize: 11,
    color: '#9995AA',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  tutorNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#403B5C',
  },

  tutorEmail: {
    fontSize: 12,
    color: '#858195',
    marginTop: 3,
  },

  verDetalhes: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'right',
  },

  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F6F5FF',
  },

  carregando: {
    marginTop: 12,
    color: '#77738F',
    fontSize: 14,
  },

  erro: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
  },
});