import { ActivityIndicator, Text, View } from 'react-native';

import { useTema } from '../context/TemaContext';
import { useEstilos } from '../theme/useEstilos';
import Botao from './Botao';

export function Carregando({ mensagem, telaCheia = true }) {
  const { cores } = useTema();
  const styles = useEstilos(criarEstilos);

  return (
    <View style={telaCheia ? styles.telaCheia : styles.inline}>
      <ActivityIndicator
        size="large"
        color={cores.primaria}
      />

      {mensagem ? (
        <Text style={styles.mensagem}>
          {mensagem}
        </Text>
      ) : null}
    </View>
  );
}

export function ErroCarregamento({ mensagem, onTentarNovamente }) {
  const styles = useEstilos(criarEstilos);

  return (
    <View style={styles.telaCheia}>
      <Text style={styles.erro}>
        {mensagem}
      </Text>

      {onTentarNovamente ? (
        <Botao
          titulo="Tentar novamente"
          compacto
          onPress={onTentarNovamente}
        />
      ) : null}
    </View>
  );
}

export function MensagemErro({ mensagem }) {
  const styles = useEstilos(criarEstilos);

  if (!mensagem) {
    return null;
  }

  return (
    <Text style={styles.erroInline}>
      {mensagem}
    </Text>
  );
}

const criarEstilos = (cores) => ({
  telaCheia: {
    flex: 1,
    backgroundColor: cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  inline: {
    alignItems: 'center',
    padding: 20,
  },

  mensagem: {
    marginTop: 10,
    color: cores.textoSecundario,
    fontSize: 14,
  },

  erro: {
    color: cores.perigo,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
  },

  erroInline: {
    color: cores.perigo,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 15,
  },
});
