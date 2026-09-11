import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
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
        Gerencie os dados da clínica e acompanhe
        os animais cadastrados.
      </Text>

      <Text style={styles.sectionTitle}>
        Gestão
      </Text>

      <View style={styles.principalContainer}>

        <TouchableOpacity
          style={styles.principalCard}
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
              Gerencie os animais cadastrados
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.principalCard}
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
        Outras opções
      </Text>

      <View style={styles.secondaryContainer}>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Vacinas')}
        >
          <Text style={styles.secondaryEmoji}>
            💉
          </Text>

          <Text style={styles.secondaryText}>
            Vacinas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Medicamentos')}
        >
          <Text style={styles.secondaryEmoji}>
            💊
          </Text>

          <Text style={styles.secondaryText}>
            Medicamentos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.secondaryEmoji}>
            📋
          </Text>

          <Text style={styles.secondaryText}>
            Cadastro
          </Text>
        </TouchableOpacity>

      </View>

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

  welcome: {
    fontSize: 15,
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
    marginBottom: 26,
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
  },

  arrow: {
    fontSize: 30,
    color: '#6C63FF',
    marginLeft: 8,
  },

  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    minHeight: 92,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  secondaryEmoji: {
    fontSize: 25,
    marginBottom: 8,
  },

  secondaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#403B5C',
  },
});