import { useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { criarPet } from '../services/petsService';

export default function PetFormScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [especie, setEspecie] = useState('');
  const [nivelRisco, setNivelRisco] = useState('BAIXO');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function cadastrarPet() {
    if (!nome || !idade || !especie) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      await criarPet({
        nome,
        idade: Number(idade),
        especie,
        nivelRisco,
        tutor: {
          id: 1,
        },
      });

      navigation.goBack();
    } catch (error) {
      setErro('Não foi possível cadastrar o pet.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Pet</Text>

      <Text style={styles.subtitulo}>
        Adicione um novo animal ao sistema
      </Text>

      <Text style={styles.label}>Nome do pet</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Rex"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Idade</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 3"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Espécie</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Cachorro"
        value={especie}
        onChangeText={setEspecie}
      />

      <Text style={styles.label}>Nível de risco</Text>

      <View style={styles.riscos}>
        {['BAIXO', 'MEDIO', 'ALTO'].map((risco) => (
          <TouchableOpacity
            key={risco}
            style={[
              styles.botaoRisco,
              nivelRisco === risco && styles.botaoRiscoSelecionado,
            ]}
            onPress={() => setNivelRisco(risco)}
          >
            <Text
              style={[
                styles.textoRisco,
                nivelRisco === risco && styles.textoRiscoSelecionado,
              ]}
            >
              {risco}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarPet}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Cadastrar Pet</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginTop: 20,
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#403B5C',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  riscos: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 25,
  },

  botaoRisco: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },

  botaoRiscoSelecionado: {
    backgroundColor: '#6C63FF',
  },

  textoRisco: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  textoRiscoSelecionado: {
    color: '#fff',
  },

  botao: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  erro: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 15,
  },
});