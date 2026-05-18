import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        🐾
      </Text>

      <Text style={styles.title}>
        SuperNova VET
      </Text>

      <Text style={styles.subtitle}>
        Monitoramento inteligente para saúde preventiva de pets
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pets')}
      >
        <Text style={styles.buttonText}>
          Pets
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Vacinas')}
      >
        <Text style={styles.buttonText}>
          Vacinas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Medicamentos')}
      >
        <Text style={styles.buttonText}>
          Medicamentos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>
          Cadastro
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logo: {
    fontSize: 70,
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#6C63FF',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});