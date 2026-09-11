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

import { listarTutores } from '../services/tutoresService';

export default function TutoresScreen({ navigation }) {
  const [tutores, setTutores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarTutores() {
    try {
      setCarregando(true);
      setErro('');

      const dados = await listarTutores();
      setTutores(dados);
    } catch (error) {
      setErro('Não foi possível carregar os tutores.');
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarTutores();
    }, [])
  );

  function renderTutor({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('TutorDetails', {
            tutor: item,
          })
        }
      >
        <View style={styles.icone}>
          <Text style={styles.iconeTexto}>
            {item.nome?.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.informacoes}>
          <Text style={styles.nome}>
            {item.nome}
          </Text>

          <Text style={styles.email}>
            {item.email}
          </Text>

          <Text style={styles.telefone}>
            {item.telefone}
          </Text>

          <Text style={styles.verDetalhes}>
            Toque para ver detalhes →
          </Text>
        </View>

        {item.perfil ? (
          <View style={styles.perfil}>
            <Text style={styles.perfilTexto}>
              {item.perfil}
            </Text>
          </View>
        ) : null}
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
          Carregando tutores...
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
            Tutores
          </Text>

          <Text style={styles.subtitulo}>
            Pessoas cadastradas no sistema
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() =>
            navigation.navigate('TutorForm')
          }
        >
          <Text style={styles.textoBotao}>
            + Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contador}>
        <Text style={styles.numero}>
          {tutores.length}
        </Text>

        <Text style={styles.contadorTexto}>
          tutores
        </Text>
      </View>

      <FlatList
        data={tutores}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTutor}
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

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  contador: {
    backgroundColor: '#6C63FF',
    width: 65,
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
    fontSize: 10,
  },

  lista: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  icone: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  iconeTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6C63FF',
  },

  informacoes: {
    flex: 1,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#29254A',
  },

  email: {
    fontSize: 13,
    color: '#77738F',
    marginTop: 4,
  },

  telefone: {
    fontSize: 12,
    color: '#9995AA',
    marginTop: 3,
  },

  verDetalhes: {
    color: '#6C63FF',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 8,
  },

  perfil: {
    backgroundColor: '#EEECFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  perfilTexto: {
    color: '#6C63FF',
    fontSize: 9,
    fontWeight: 'bold',
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