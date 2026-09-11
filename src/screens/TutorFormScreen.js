import { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { criarTutor } from '../services/tutoresService';

export default function TutorFormScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function cadastrarTutor() {
    if (!nome || !email || !telefone) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      await criarTutor({
        nome,
        email,
        telefone,
      });

      navigation.goBack();
    } catch (error) {
      setErro('Não foi possível cadastrar o tutor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titulo}>
        Cadastrar Tutor
      </Text>

      <Text style={styles.subtitulo}>
        Adicione um novo responsável ao sistema
      </Text>

      <Text style={styles.label}>
        Nome
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: João da Silva"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>
        E-mail
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: joao@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>
        Telefone
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 11999999999"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      {erro ? (
        <Text style={styles.erro}>
          {erro}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarTutor}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>
            Cadastrar Tutor
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5FF',
  },

  conteudo: {
    padding: 25,
    paddingBottom: 40,
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
    color: '#77738F',
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#403B5C',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  erro: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 15,
  },
});