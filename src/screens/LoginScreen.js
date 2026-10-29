import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';

import {
  Botao,
  CampoTexto,
  MensagemErro,
} from '../components';
import { useAuth } from '../context/AuthContext';
import { useEstilos } from '../theme/useEstilos';
import { obterMensagemErro } from '../utils/erros';

export default function LoginScreen() {
  const { login } = useAuth();
  const styles = useEstilos(criarEstilos);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function fazerLogin() {
    if (!email.trim() || !senha) {
      setErro('Preencha e-mail e senha.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      await login(email.trim().toLowerCase(), senha);
    } catch (error) {
      setErro(
        obterMensagemErro(error, {
          401: 'E-mail ou senha inválidos.',
        })
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.logo}>
        🐾
      </Text>

      <Text style={styles.titulo}>
        SuperNova VET
      </Text>

      <Text style={styles.subtitulo}>
        Acesse sua conta
      </Text>

      <CampoTexto
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <CampoTexto
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <MensagemErro mensagem={erro} />

      <Botao
        titulo="Entrar"
        onPress={fazerLogin}
        carregando={carregando}
      />
    </KeyboardAvoidingView>
  );
}

const criarEstilos = (cores) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: cores.fundo,
  },

  logo: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: cores.primaria,
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    color: cores.textoSecundario,
    marginBottom: 30,
  },
});
