import {
  FlatList,
  Text,
  View,
} from 'react-native';

import {
  Botao,
  CabecalhoTela,
  Card,
  Carregando,
  ErroCarregamento,
  Icone,
} from '../components';
import { useAtualizarAoFocar } from '../hooks/useAtualizarAoFocar';
import { useTutores } from '../hooks/useTutores';
import { useEstilos } from '../theme/useEstilos';

export default function TutoresScreen({ navigation }) {
  const styles = useEstilos(criarEstilos);

  const {
    data: tutores = [],
    isLoading,
    isError,
    refetch,
  } = useTutores();

  useAtualizarAoFocar(refetch);

  if (isLoading) {
    return <Carregando mensagem="Carregando tutores..." />;
  }

  if (isError) {
    return (
      <ErroCarregamento
        mensagem="Não foi possível carregar os tutores."
        onTentarNovamente={refetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CabecalhoTela
        titulo="Tutores"
        subtitulo={`${tutores.length} pessoas cadastradas`}
        acao={
          <Botao
            titulo="+ Adicionar"
            compacto
            onPress={() => navigation.navigate('TutorForm')}
          />
        }
      />

      <FlatList
        data={tutores}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        onRefresh={refetch}
        refreshing={false}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate('TutorDetails', {
                tutor: item,
              })
            }
          >
            <Icone conteudo={item.nome?.charAt(0).toUpperCase()} />

            <View style={styles.informacoes}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.email}>
                {item.email}
              </Text>

              <Text style={styles.telefone}>
                {item.telefone}
              </Text>
            </View>

            {item.perfil ? (
              <View style={styles.perfil}>
                <Text style={styles.perfilTexto}>
                  {item.perfil}
                </Text>
              </View>
            ) : null}
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum tutor cadastrado.
          </Text>
        }
      />
    </View>
  );
}

const criarEstilos = (cores) => ({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  lista: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  informacoes: {
    flex: 1,
    marginHorizontal: 14,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.texto,
  },

  email: {
    fontSize: 13,
    color: cores.textoSecundario,
    marginTop: 4,
  },

  telefone: {
    fontSize: 12,
    color: cores.textoTerciario,
    marginTop: 3,
  },

  perfil: {
    backgroundColor: cores.superficieDestaque,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  perfilTexto: {
    color: cores.primaria,
    fontSize: 9,
    fontWeight: 'bold',
  },

  vazio: {
    textAlign: 'center',
    color: cores.textoSecundario,
    marginTop: 40,
    fontSize: 14,
  },
});
