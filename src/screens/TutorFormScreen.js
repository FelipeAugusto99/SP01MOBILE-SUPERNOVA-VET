import { useState } from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';

import {
  Botao,
  CampoTexto,
  MensagemErro,
} from '../components';
import { useSalvarTutor } from '../hooks/useTutores';
import { useEstilos } from '../theme/useEstilos';
import { obterMensagemErro } from '../utils/erros';
import {
  montarDadosTutor,
  validarTutor,
} from '../utils/tutores';

export default function TutorFormScreen({ route, navigation }) {
  const tutor = route.params?.tutor;
  const editando = !!tutor;
  const styles = useEstilos(criarEstilos);

  const [nome, setNome] = useState(tutor?.nome || '');
  const [email, setEmail] = useState(tutor?.email || '');
  const [telefone, setTelefone] = useState(tutor?.telefone || '');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const mutation = useSalvarTutor(tutor?.id);

  function salvarTutor() {
    const formulario = {
      nome,
      email,
      telefone,
      senha,
    };

    const erroValidacao = validarTutor(formulario, editando);

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro('');

    mutation.mutate(montarDadosTutor(formulario), {
      onSuccess: () => navigation.goBack(),
      onError: (error) =>
        setErro(
          obterMensagemErro(error, {
            padrao: editando
              ? 'Não foi possível atualizar o tutor.'
              : 'Não foi possível cadastrar o tutor.',
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
          ? 'Atualize os dados do responsável'
          : 'Adicione um novo responsável ao sistema'}
      </Text>

      <CampoTexto
        label="Nome"
        placeholder="Ex: João da Silva"
        value={nome}
        onChangeText={setNome}
      />

      <CampoTexto
        label="E-mail"
        placeholder="Ex: joao@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <CampoTexto
        label="Telefone"
        placeholder="Ex: 11999999999"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <CampoTexto
        label={editando ? 'Nova senha (opcional)' : 'Senha de acesso'}
        placeholder={
          editando
            ? 'Deixe em branco para manter'
            : 'Mínimo de 6 caracteres'
        }
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <MensagemErro mensagem={erro} />

      <Botao
        titulo={editando ? 'Salvar alterações' : 'Cadastrar tutor'}
        onPress={salvarTutor}
        carregando={mutation.isPending}
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
});
