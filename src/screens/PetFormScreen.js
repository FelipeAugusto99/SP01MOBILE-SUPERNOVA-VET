import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    atualizarPet,
    criarPet,
} from '../services/petsService';

import { listarTutores } from '../services/tutoresService';

export default function PetFormScreen({ route, navigation }) {
  const pet = route.params?.pet;
  const editando = !!pet;

  const [nome, setNome] = useState(pet?.nome || '');
  const [idade, setIdade] = useState(
    pet?.idade ? String(pet.idade) : ''
  );
  const [especie, setEspecie] = useState(
    pet?.especie || ''
  );
  const [nivelRisco, setNivelRisco] = useState(
    pet?.nivelRisco || 'BAIXO'
  );

  const [tutores, setTutores] = useState([]);
  const [tutorSelecionado, setTutorSelecionado] = useState(
    pet?.tutor || null
  );

  const [carregandoTutores, setCarregandoTutores] =
    useState(true);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregarTutores() {
    try {
      setCarregandoTutores(true);
      setErro('');

      const dados = await listarTutores();
      setTutores(dados);

      if (!tutorSelecionado && dados.length > 0) {
        setTutorSelecionado(dados[0]);
      }
    } catch (error) {
      setErro('Não foi possível carregar os tutores.');
    } finally {
      setCarregandoTutores(false);
    }
  }

  useEffect(() => {
    carregarTutores();
  }, []);

  async function salvarPet() {
    if (!nome || !idade || !especie) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!tutorSelecionado) {
      setErro('Selecione um tutor.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      const dadosPet = {
        nome,
        idade: Number(idade),
        especie,
        nivelRisco,
        tutor: {
          id: tutorSelecionado.id,
          nome: tutorSelecionado.nome,
          email: tutorSelecionado.email,
          telefone: tutorSelecionado.telefone,
        },
      };

      if (editando) {
        await atualizarPet(pet.id, dadosPet);
      } else {
        await criarPet(dadosPet);
      }

      navigation.goBack();
    } catch (error) {
      setErro(
        editando
          ? 'Não foi possível atualizar o pet.'
          : 'Não foi possível cadastrar o pet.'
      );
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
        {editando ? 'Editar Pet' : 'Cadastrar Pet'}
      </Text>

      <Text style={styles.subtitulo}>
        {editando
          ? 'Atualize os dados do animal'
          : 'Adicione um novo animal ao sistema'}
      </Text>

      <Text style={styles.label}>
        Nome do pet
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Rex"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>
        Idade
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 3"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        Espécie
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Cachorro"
        value={especie}
        onChangeText={setEspecie}
      />

      <Text style={styles.label}>
        Nível de risco
      </Text>

      <View style={styles.riscos}>
        {['BAIXO', 'MEDIO', 'ALTO'].map((risco) => (
          <TouchableOpacity
            key={risco}
            style={[
              styles.botaoRisco,
              nivelRisco === risco &&
                styles.botaoRiscoSelecionado,
            ]}
            onPress={() => setNivelRisco(risco)}
          >
            <Text
              style={[
                styles.textoRisco,
                nivelRisco === risco &&
                  styles.textoRiscoSelecionado,
              ]}
            >
              {risco}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>
        Tutor
      </Text>

      {carregandoTutores ? (
        <View style={styles.carregandoTutores}>
          <ActivityIndicator color="#6C63FF" />

          <Text style={styles.textoCarregando}>
            Carregando tutores...
          </Text>
        </View>
      ) : (
        <View style={styles.tutores}>
          {tutores.map((tutor) => (
            <TouchableOpacity
              key={tutor.id}
              style={[
                styles.botaoTutor,
                tutorSelecionado?.id === tutor.id &&
                  styles.botaoTutorSelecionado,
              ]}
              onPress={() =>
                setTutorSelecionado(tutor)
              }
            >
              <Text
                style={[
                  styles.nomeTutor,
                  tutorSelecionado?.id === tutor.id &&
                    styles.nomeTutorSelecionado,
                ]}
              >
                {tutor.nome}
              </Text>

              <Text
                style={[
                  styles.emailTutor,
                  tutorSelecionado?.id === tutor.id &&
                    styles.emailTutorSelecionado,
                ]}
              >
                {tutor.email}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {erro ? (
        <Text style={styles.erro}>
          {erro}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarPet}
        disabled={carregando || carregandoTutores}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>
            {editando
              ? 'Salvar Alterações'
              : 'Cadastrar Pet'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  tutores: {
    marginBottom: 25,
  },

  botaoTutor: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  botaoTutorSelecionado: {
    borderColor: '#6C63FF',
    backgroundColor: '#EEECFF',
  },

  nomeTutor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#403B5C',
  },

  nomeTutorSelecionado: {
    color: '#6C63FF',
  },

  emailTutor: {
    fontSize: 12,
    color: '#858195',
    marginTop: 4,
  },

  emailTutorSelecionado: {
    color: '#6C63FF',
  },

  carregandoTutores: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    padding: 15,
  },

  textoCarregando: {
    marginLeft: 10,
    color: '#77738F',
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