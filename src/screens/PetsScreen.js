import { useState } from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';

import {
  BadgeRisco,
  Botao,
  CabecalhoTela,
  Card,
  Carregando,
  ErroCarregamento,
  Icone,
  Opcao,
} from '../components';
import { useAtualizarAoFocar } from '../hooks/useAtualizarAoFocar';
import { usePets } from '../hooks/usePets';
import { useEstilos } from '../theme/useEstilos';
import {
  filtrarPorRisco,
  NIVEIS_RISCO,
  obterEmojiEspecie,
} from '../utils/pets';

export default function PetsScreen({ route, navigation }) {
  const styles = useEstilos(criarEstilos);

  const [filtroRisco, setFiltroRisco] = useState(
    route.params?.filtroRisco || null
  );

  const {
    data: pets = [],
    isLoading,
    isError,
    refetch,
  } = usePets();

  useAtualizarAoFocar(refetch);

  if (isLoading) {
    return <Carregando mensagem="Carregando pets..." />;
  }

  if (isError) {
    return (
      <ErroCarregamento
        mensagem="Não foi possível carregar os pets."
        onTentarNovamente={refetch}
      />
    );
  }

  const petsFiltrados = filtrarPorRisco(pets, filtroRisco);

  return (
    <View style={styles.container}>
      <CabecalhoTela
        titulo="Pets"
        subtitulo="Gerencie os animais cadastrados"
        acao={
          <Botao
            titulo="+ Adicionar"
            compacto
            onPress={() => navigation.navigate('PetForm')}
          />
        }
      />

      <View style={styles.filtros}>
        {[null, ...NIVEIS_RISCO].map((nivel) => (
          <Opcao
            key={nivel || 'TODOS'}
            titulo={nivel || 'TODOS'}
            selecionada={filtroRisco === nivel}
            onPress={() => setFiltroRisco(nivel)}
            style={styles.filtro}
          />
        ))}
      </View>

      <FlatList
        data={petsFiltrados}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        onRefresh={refetch}
        refreshing={false}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate('PetDetails', {
                pet: item,
              })
            }
          >
            <Icone conteudo={obterEmojiEspecie(item.especie)} />

            <View style={styles.informacoes}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.detalhes}>
                {item.especie} • {item.idade} anos
              </Text>

              <Text style={styles.tutor}>
                Tutor: {item.tutor?.nome || 'Não informado'}
              </Text>
            </View>

            <BadgeRisco nivel={item.nivelRisco} />
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            {filtroRisco
              ? `Nenhum pet com risco ${filtroRisco}.`
              : 'Nenhum pet cadastrado.'}
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

  filtros: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  filtro: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
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
    marginBottom: 4,
  },

  detalhes: {
    fontSize: 13,
    color: cores.primaria,
    marginBottom: 4,
  },

  tutor: {
    fontSize: 12,
    color: cores.textoSecundario,
  },

  vazio: {
    textAlign: 'center',
    color: cores.textoSecundario,
    marginTop: 40,
    fontSize: 14,
  },
});
