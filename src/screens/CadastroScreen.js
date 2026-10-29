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
import { useCadastro } from '../hooks/useCadastro';
import { useEstilos } from '../theme/useEstilos';
import { obterMensagemErro } from '../utils/erros';
import {
  montarDadosTutor,
  validarCadastro,
} from '../utils/tutores';

export default function CadastroScreen({ navigation }) {
  const styles = useEstilos(criarEstilos);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [erro, setErro] = useState('');

  const mutation = useCadastro();

  function cadastrar() {
    const formulario = {
      nome,
      email,
      telefone,
      senha,
      confirmacaoSenha,
    };

    const erroValidacao = validarCadastro(formulario);

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro('');

    mutation.mutate(montarDadosTutor(formulario), {
      onError: (error) =>
        setErro(
          obterMensagemErro(error, {
            padrao: 'Não foi possível criar a conta.',
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
      <Text style={styles.titulo}>
        Crie sua conta
      </Text>

      <Text style={styles.subtitulo}>
        Cadastre-se como tutor para acompanhar seus pets atendidos pela clínica.
      </Text>

      <CampoTexto
        label="Nome completo"
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
        label="Senha"
        placeholder="Mínimo de 6 caracteres"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <CampoTexto
        label="Confirmar senha"
        placeholder="Repita a senha"
        value={confirmacaoSenha}
        onChangeText={setConfirmacaoSenha}
        secureTextEntry
      />

      <MensagemErro mensagem={erro} />

      <Botao
        titulo="Criar conta"
        onPress={cadastrar}
        carregando={mutation.isPending}
      />

      <Botao
        titulo="Já tenho conta"
        variante="contorno"
        onPress={() => navigation.goBack()}
        disabled={mutation.isPending}
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

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: cores.primaria,
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 15,
    lineHeight: 21,
    color: cores.textoSecundario,
    marginBottom: 25,
  },
});
