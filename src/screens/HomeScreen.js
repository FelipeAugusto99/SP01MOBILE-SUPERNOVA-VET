import { useLayoutEffect } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Card,
  Carregando,
  Icone,
} from '../components';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import { useAtualizarAoFocar } from '../hooks/useAtualizarAoFocar';
import { usePermissoes } from '../hooks/usePermissoes';
import { usePetsCriticos } from '../hooks/usePets';
import { useEstilos } from '../theme/useEstilos';

function CardMenu({ emoji, titulo, descricao, onPress }) {
  const styles = useEstilos(criarEstilos);

  return (
    <Card
      style={styles.cardMenu}
      onPress={onPress}
    >
      <Icone conteudo={emoji} />

      <View style={styles.cardConteudo}>
        <Text style={styles.cardTitulo}>
          {titulo}
        </Text>

        <Text style={styles.cardDescricao}>
          {descricao}
        </Text>
      </View>

      <Text style={styles.seta}>
        ›
      </Text>
    </Card>
  );
}

export default function HomeScreen({ navigation }) {
  const { usuario, logout } = useAuth();
  const { escuro, alterarPreferencia } = useTema();
  const { verTodosPets, gerenciarTutores } = usePermissoes();
  const styles = useEstilos(criarEstilos);

  const {
    data: petsCriticos = [],
    isLoading,
    isError,
    refetch: refetchPetsCriticos,
  } = usePetsCriticos();

  useAtualizarAoFocar(refetchPetsCriticos);

  useLayoutEffect(() => {
    function confirmarLogout() {
      Alert.alert(
        'Sair',
        'Deseja encerrar a sessão?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Sair',
            style: 'destructive',
            onPress: logout,
          },
        ]
      );
    }

    navigation.setOptions({
      headerRight: () => (
        <View style={styles.acoesHeader}>
          <TouchableOpacity
            onPress={() => alterarPreferencia(escuro ? 'claro' : 'escuro')}
            accessibilityLabel="Alternar tema"
          >
            <Text style={styles.iconeTema}>
              {escuro ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmarLogout}>
            <Text style={styles.sair}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, logout, styles, escuro, alterarPreferencia]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.boasVindas}>
        Olá, {usuario.username}
      </Text>

      <Text style={styles.subtitulo}>
        {verTodosPets
          ? 'Gerencie os pets e tutores da clínica em um só lugar.'
          : 'Acompanhe a saúde dos seus pets na clínica.'}
      </Text>

      <Text style={styles.secao}>
        {verTodosPets ? 'Gestão' : 'Meus pets'}
      </Text>

      <CardMenu
        emoji="🐶"
        titulo={verTodosPets ? 'Pets' : 'Meus pets'}
        descricao={
          verTodosPets
            ? 'Cadastre, edite e acompanhe os animais'
            : 'Veja os dados e o nível de risco dos seus animais'
        }
        onPress={() => navigation.navigate('Pets')}
      />

      {gerenciarTutores ? (
        <CardMenu
          emoji="👤"
          titulo="Tutores"
          descricao="Gerencie os responsáveis pelos pets"
          onPress={() => navigation.navigate('Tutores')}
        />
      ) : null}

      <Text style={styles.secao}>
        Atenção
      </Text>

      {isLoading ? (
        <Card>
          <Carregando
            mensagem="Carregando informações..."
            telaCheia={false}
          />
        </Card>
      ) : isError ? (
        <Card>
          <Text style={styles.erro}>
            ⚠️ Não foi possível carregar os pets críticos.
          </Text>
        </Card>
      ) : (
        <Card>
          <View style={styles.criticosTopo}>
            <View style={styles.criticosTextos}>
              <Text style={styles.criticosTitulo}>
                Pets em situação crítica
              </Text>

              <Text style={styles.cardDescricao}>
                Acompanhe os animais que precisam de atenção
              </Text>
            </View>

            <View style={styles.criticosBadge}>
              <Text style={styles.criticosBadgeTexto}>
                {petsCriticos.length}
              </Text>
            </View>
          </View>

          {petsCriticos.length > 0 ? (
            <TouchableOpacity
              style={styles.criticosRodape}
              onPress={() =>
                navigation.navigate('Pets', {
                  filtroRisco: 'ALTO',
                })
              }
            >
              <Text style={styles.criticosLink}>
                Ver pets críticos
              </Text>

              <Text style={styles.criticosLink}>
                →
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.criticosRodape, styles.semCriticos]}>
              Nenhum pet crítico no momento.
            </Text>
          )}
        </Card>
      )}

      <Text style={styles.secao}>
        Mais
      </Text>

      <CardMenu
        emoji="ℹ️"
        titulo="Sobre o App"
        descricao="Versão publicada, commit de referência e aparência"
        onPress={() => navigation.navigate('Sobre')}
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
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 30,
  },

  acoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  iconeTema: {
    fontSize: 18,
  },

  sair: {
    color: cores.textoSobrePrimaria,
    fontSize: 15,
    fontWeight: 'bold',
  },

  boasVindas: {
    fontSize: 26,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 14,
    lineHeight: 21,
    color: cores.textoSecundario,
    marginBottom: 24,
  },

  secao: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.texto,
    marginTop: 12,
    marginBottom: 12,
  },

  cardMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardConteudo: {
    flex: 1,
    marginLeft: 14,
  },

  cardTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 4,
  },

  cardDescricao: {
    fontSize: 12,
    color: cores.textoSecundario,
    lineHeight: 17,
  },

  seta: {
    fontSize: 30,
    color: cores.primaria,
    marginLeft: 8,
  },

  erro: {
    color: cores.perigo,
    fontSize: 13,
    textAlign: 'center',
  },

  criticosTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  criticosTextos: {
    flex: 1,
    marginRight: 10,
  },

  criticosTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 3,
  },

  criticosBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: cores.perigoFundo,
    justifyContent: 'center',
    alignItems: 'center',
  },

  criticosBadgeTexto: {
    color: cores.perigo,
    fontSize: 16,
    fontWeight: 'bold',
  },

  criticosRodape: {
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: cores.divisor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  criticosLink: {
    color: cores.primaria,
    fontSize: 13,
    fontWeight: 'bold',
  },

  semCriticos: {
    color: cores.textoSecundario,
    fontSize: 12,
  },
});
