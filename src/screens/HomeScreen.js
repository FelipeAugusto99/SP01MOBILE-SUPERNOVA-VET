import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  useQuery,
} from '@tanstack/react-query';

import {
  useCallback,
} from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import api from '../services/api';

export default function HomeScreen({ navigation }) {
  const {
    data: petsCriticos = [],
    isLoading,
    isError,
    refetch: refetchPetsCriticos,
  } = useQuery({
    queryKey: ['pets-criticos'],
    queryFn: async () => {
      const response = await api.get('/pets/criticos');
      return response.data;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetchPetsCriticos();
    }, [refetchPetsCriticos])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTexto}>
          <Text style={styles.welcome}>
            Bem-vindo ao
          </Text>

          <Text style={styles.title}>
            SuperNova VET
          </Text>
        </View>

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            🐾
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Gerencie os pets e tutores da clínica
        em um só lugar.
      </Text>

      <Text style={styles.sectionTitle}>
        Gestão
      </Text>

      <View style={styles.principalContainer}>
        <TouchableOpacity
          style={styles.principalCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Pets')}
        >
          <View style={styles.cardIcon}>
            <Text style={styles.cardEmoji}>
              🐶
            </Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Pets
            </Text>

            <Text style={styles.cardDescription}>
              Cadastre, edite e acompanhe os animais
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.principalCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Tutores')}
        >
          <View style={styles.cardIcon}>
            <Text style={styles.cardEmoji}>
              👤
            </Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Tutores
            </Text>

            <Text style={styles.cardDescription}>
              Gerencie os responsáveis pelos pets
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Atenção
      </Text>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="#6C63FF"
          />

          <Text style={styles.loadingText}>
            Carregando informações...
          </Text>
        </View>
      ) : isError ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>
            ⚠️
          </Text>

          <Text style={styles.errorText}>
            Não foi possível carregar os pets críticos.
          </Text>
        </View>
      ) : (
        <View style={styles.criticosCard}>
          <View style={styles.criticosTopo}>
            <View>
              <Text style={styles.criticosTitulo}>
                Pets em situação crítica
              </Text>

              <Text style={styles.criticosSubtitulo}>
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
              style={styles.criticosBotao}
              onPress={() => navigation.navigate('Pets')}
            >
              <Text style={styles.criticosBotaoTexto}>
                Ver pets críticos
              </Text>

              <Text style={styles.criticosSeta}>
                →
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.semCriticos}>
              Nenhum pet crítico no momento.
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5FF',
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  headerTexto: {
    flex: 1,
  },

  welcome: {
    fontSize: 14,
    color: '#77738F',
    marginBottom: 3,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#29254A',
  },

  logoContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  logo: {
    fontSize: 30,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#77738F',
    marginBottom: 28,
    maxWidth: 340,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#29254A',
    marginBottom: 12,
  },

  principalContainer: {
    marginBottom: 24,
  },

  principalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  cardEmoji: {
    fontSize: 27,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#29254A',
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 12,
    color: '#858195',
    lineHeight: 17,
  },

  arrow: {
    fontSize: 30,
    color: '#6C63FF',
    marginLeft: 8,
  },

  loading: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: '#77738F',
  },

  errorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  errorIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    textAlign: 'center',
  },

  criticosCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  criticosTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  criticosTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#29254A',
    marginBottom: 3,
  },

  criticosSubtitulo: {
    fontSize: 12,
    color: '#858195',
    maxWidth: 260,
  },

  criticosBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  criticosBadgeTexto: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },

  criticosBotao: {
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  criticosBotaoTexto: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  criticosSeta: {
    color: '#6C63FF',
    fontSize: 20,
  },

  semCriticos: {
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF5',
    color: '#77738F',
    fontSize: 12,
  },
});