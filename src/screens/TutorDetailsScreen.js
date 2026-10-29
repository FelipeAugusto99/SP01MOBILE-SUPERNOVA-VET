import {
  Alert,
  ScrollView,
  Text,
} from 'react-native';

import {
  Botao,
  Card,
  Icone,
} from '../components';
import { useExcluirTutor, useTutor } from '../hooks/useTutores';
import { useEstilos } from '../theme/useEstilos';
import { obterMensagemErro } from '../utils/erros';

export default function TutorDetailsScreen({ route, navigation }) {
  const tutorInicial = route.params.tutor;
  const styles = useEstilos(criarEstilos);

  const { data: tutor = tutorInicial } = useTutor(tutorInicial.id);

  const mutation = useExcluirTutor();

  function confirmarExclusao() {
    Alert.alert(
      'Excluir tutor',
      `Tem certeza que deseja excluir ${tutor.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            mutation.mutate(tutor.id, {
              onSuccess: () => navigation.goBack(),
              onError: (error) =>
                Alert.alert(
                  'Não foi possível excluir',
                  obterMensagemErro(error, {
                    409: 'Este tutor possui pets vinculados. Remova ou altere os pets antes de excluir o tutor.',
                    403: 'Apenas usuários administradores podem excluir tutores.',
                    padrao: 'Não foi possível excluir o tutor.',
                  })
                ),
            });
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Icone
        conteudo={tutor.nome?.charAt(0).toUpperCase()}
        tamanho={90}
        style={styles.icone}
      />

      <Text style={styles.nome}>
        {tutor.nome}
      </Text>

      <Text style={styles.perfil}>
        {tutor.perfil || 'TUTOR'}
      </Text>

      <Card style={styles.card}>
        <Text style={styles.label}>
          E-mail
        </Text>

        <Text style={styles.valor}>
          {tutor.email}
        </Text>

        <Text style={styles.label}>
          Telefone
        </Text>

        <Text style={[styles.valor, styles.ultimoValor]}>
          {tutor.telefone}
        </Text>
      </Card>

      <Botao
        titulo="Editar tutor"
        onPress={() => navigation.navigate('TutorForm', { tutor })}
        disabled={mutation.isPending}
      />

      <Botao
        titulo="Excluir tutor"
        variante="contornoPerigo"
        onPress={confirmarExclusao}
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
    alignItems: 'center',
  },

  icone: {
    marginTop: 10,
    marginBottom: 15,
  },

  nome: {
    fontSize: 27,
    fontWeight: 'bold',
    color: cores.texto,
    textAlign: 'center',
  },

  perfil: {
    color: cores.primaria,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 11,
    color: cores.textoTerciario,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  valor: {
    fontSize: 16,
    color: cores.texto,
    marginBottom: 20,
  },

  ultimoValor: {
    marginBottom: 0,
  },
});
