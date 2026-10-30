import { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  BadgeRisco,
  Botao,
  CampoTexto,
  Carregando,
  MensagemErro,
  Opcao,
} from '../components';
import { useSalvarPet } from '../hooks/usePets';
import { useTutores } from '../hooks/useTutores';
import { useEstilos } from '../theme/useEstilos';
import { obterMensagemErro } from '../utils/erros';
import {
  calcularRiscoPorIdade,
  IDADE_RISCO_ALTO,
  IDADE_RISCO_MEDIO,
  montarDadosPet,
  validarPet,
} from '../utils/pets';

export default function PetFormScreen({ route, navigation }) {
  const pet = route.params?.pet;
  const editando = !!pet;
  const styles = useEstilos(criarEstilos);

  const [nome, setNome] = useState(pet?.nome || '');
  const [idade, setIdade] = useState(
    pet?.idade !== undefined ? String(pet.idade) : ''
  );
  const [especie, setEspecie] = useState(pet?.especie || '');
  const [tutorSelecionado, setTutorSelecionado] = useState(pet?.tutor || null);
  const [erro, setErro] = useState('');

  const {
    data: tutores = [],
    isLoading: carregandoTutores,
    isError: erroTutores,
  } = useTutores();

  const mutation = useSalvarPet(pet?.id);

  function salvarPet() {
    const formulario = {
      nome,
      idade,
      especie,
      tutor: tutorSelecionado,
    };

    const erroValidacao = validarPet(formulario);

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro('');

    mutation.mutate(montarDadosPet(formulario), {
      onSuccess: () => navigation.goBack(),
      onError: (error) =>
        setErro(
          obterMensagemErro(error, {
            padrao: editando
              ? 'Não foi possível atualizar o pet.'
              : 'Não foi possível cadastrar o pet.',
          })
        ),
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.subtitulo}>
        {editando
          ? 'Atualize os dados do animal'
          : 'Adicione um novo animal ao sistema'}
      </Text>

      <CampoTexto
        label="Nome do pet"
        placeholder="Ex: Rex"
        value={nome}
        onChangeText={setNome}
      />

      <CampoTexto
        label="Idade"
        placeholder="Ex: 3"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <CampoTexto
        label="Espécie"
        placeholder="Ex: Cachorro"
        value={especie}
        onChangeText={setEspecie}
      />

      <Text style={styles.label}>
        Nível de risco
      </Text>

      <View style={styles.risco}>
        {calcularRiscoPorIdade(idade) ? (
          <BadgeRisco nivel={calcularRiscoPorIdade(idade)} />
        ) : (
          <Text style={styles.riscoPendente}>
            Informe a idade
          </Text>
        )}

        <Text style={styles.riscoAjuda}>
          Calculado automaticamente pela idade: a partir de {IDADE_RISCO_MEDIO} anos é MEDIO e a partir de {IDADE_RISCO_ALTO} anos é ALTO.
        </Text>
      </View>

      <Text style={styles.label}>
        Tutor
      </Text>

      {carregandoTutores ? (
        <Carregando
          mensagem="Carregando tutores..."
          telaCheia={false}
        />
      ) : erroTutores ? (
        <MensagemErro mensagem="Não foi possível carregar os tutores." />
      ) : (
        <View style={styles.tutores}>
          {tutores.map((tutor) => (
            <Opcao
              key={tutor.id}
              titulo={tutor.nome}
              descricao={tutor.email}
              selecionada={tutorSelecionado?.id === tutor.id}
              onPress={() => setTutorSelecionado(tutor)}
              style={styles.tutor}
            />
          ))}
        </View>
      )}

      <MensagemErro mensagem={erro} />

      <Botao
        titulo={editando ? 'Salvar alterações' : 'Cadastrar pet'}
        onPress={salvarPet}
        carregando={mutation.isPending}
        disabled={carregandoTutores || erroTutores}
      />
    </ScrollView>
  );
}

const criarEstilos = (cores) => ({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  conteudo: {
    padding: 25,
    paddingBottom: 40,
  },

  subtitulo: {
    fontSize: 16,
    color: cores.textoSecundario,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: 6,
  },

  risco: {
    marginBottom: 25,
  },

  riscoPendente: {
    fontSize: 14,
    color: cores.textoTerciario,
  },

  riscoAjuda: {
    fontSize: 12,
    lineHeight: 17,
    color: cores.textoSecundario,
    marginTop: 8,
  },

  tutores: {
    marginBottom: 25,
  },

  tutor: {
    marginBottom: 10,
  },
});
