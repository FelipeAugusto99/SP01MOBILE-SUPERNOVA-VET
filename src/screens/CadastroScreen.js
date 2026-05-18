import { useState } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CadastroScreen() {

  const [nomePet, setNomePet] = useState('');
  const [idadePet, setIdadePet] = useState('');
  const [vacinaPet, setVacinaPet] = useState('');

  function limparFormulario() {
    setNomePet('');
    setIdadePet('');
    setVacinaPet('');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Cadastro de Pet</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do pet"
        value={nomePet}
        onChangeText={setNomePet}
      />

      <TextInput
        style={styles.input}
        placeholder="Idade do pet"
        value={idadePet}
        onChangeText={setIdadePet}
      />

      <TextInput
        style={styles.input}
        placeholder="Vacina"
        value={vacinaPet}
        onChangeText={setVacinaPet}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={limparFormulario}
      >
        <Text style={styles.buttonText}>
          Limpar Dados
        </Text>
      </TouchableOpacity>

      <View style={styles.resultado}>

        <Text style={styles.resultadoTitulo}>
          Dados Digitados:
        </Text>

        <Text style={styles.resultadoTexto}>
          Nome: {nomePet}
        </Text>

        <Text style={styles.resultadoTexto}>
          Idade: {idadePet}
        </Text>

        <Text style={styles.resultadoTexto}>
          Vacina: {vacinaPet}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F3FF',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  resultado: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },

  resultadoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6C63FF',
  },

  resultadoTexto: {
    fontSize: 16,
    marginBottom: 10,
  },

});