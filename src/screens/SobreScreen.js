import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  Card,
  Icone,
  Opcao,
} from '../components';
import { useAuth } from '../context/AuthContext';
import { PREFERENCIAS_TEMA, useTema } from '../context/TemaContext';
import { obterInformacoesApp } from '../services/appInfoService';
import { useEstilos } from '../theme/useEstilos';

const NOMES_TEMA = {
  sistema: 'Sistema',
  claro: 'Claro',
  escuro: 'Escuro',
};

const INTEGRANTES = [
  'Felipe Augusto Lopes Ferreira',
  'Kaique Mascarenhas dos Santos',
];

function Linha({ label, valor, destaque }) {
  const styles = useEstilos(criarEstilos);

  return (
    <View style={styles.linha}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text
        style={[styles.valor, destaque && styles.valorDestaque]}
        selectable
      >
        {valor}
      </Text>
    </View>
  );
}

export default function SobreScreen() {
  const styles = useEstilos(criarEstilos);
  const { usuario } = useAuth();
  const { preferencia, alterarPreferencia } = useTema();

  const app = obterInformacoesApp();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Icone
        conteudo="🐾"
        tamanho={80}
        style={styles.logo}
      />

      <Text style={styles.nome}>
        {app.nome}
      </Text>

      <Text style={styles.descricao}>
        Monitoramento de pets e tutores para clínicas veterinárias.
      </Text>

      <Text style={styles.secao}>
        Versão publicada
      </Text>

      <Card>
        <Linha label="Versão" valor={app.versao} />
        <Linha label="Commit" valor={app.commitCurto} destaque />
        <Linha label="Hash completo" valor={app.commitHash} />
        <Linha label="API" valor={app.urlApi} />
      </Card>

      <Text style={styles.secao}>
        Sessão
      </Text>

      <Card>
        <Linha label="Usuário" valor={usuario.username} />
        <Linha label="Perfil" valor={usuario.perfil} />
      </Card>

      <Text style={styles.secao}>
        Aparência
      </Text>

      <View style={styles.temas}>
        {PREFERENCIAS_TEMA.map((opcao) => (
          <Opcao
            key={opcao}
            titulo={NOMES_TEMA[opcao]}
            selecionada={preferencia === opcao}
            onPress={() => alterarPreferencia(opcao)}
            style={styles.tema}
          />
        ))}
      </View>

      <Text style={styles.secao}>
        Equipe
      </Text>

      <Card>
        {INTEGRANTES.map((integrante) => (
          <Text
            key={integrante}
            style={styles.integrante}
          >
            {integrante}
          </Text>
        ))}
      </Card>

      <Text style={styles.rodape}>
        Projeto acadêmico FIAP • Challenge 2026
      </Text>
    </ScrollView>
  );
}

const criarEstilos = (cores) => ({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  conteudo: {
    padding: 22,
    paddingBottom: 40,
  },

  logo: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 12,
  },

  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: cores.texto,
    textAlign: 'center',
  },

  descricao: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },

  secao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.texto,
    marginTop: 16,
    marginBottom: 10,
  },

  linha: {
    paddingVertical: 6,
  },

  label: {
    fontSize: 11,
    color: cores.textoTerciario,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 2,
  },

  valor: {
    fontSize: 15,
    color: cores.texto,
  },

  valorDestaque: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.primaria,
    fontFamily: 'monospace',
  },

  temas: {
    flexDirection: 'row',
    gap: 8,
  },

  tema: {
    flex: 1,
    alignItems: 'center',
  },

  integrante: {
    fontSize: 15,
    color: cores.texto,
    paddingVertical: 4,
  },

  rodape: {
    fontSize: 12,
    color: cores.textoTerciario,
    textAlign: 'center',
    marginTop: 24,
  },
});
