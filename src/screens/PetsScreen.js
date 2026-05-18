import { StyleSheet, Text, View } from 'react-native';

export default function PetsScreen() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Pets Cadastrados
      </Text>

      <View style={styles.card}>
        <Text style={styles.nome}>🐶 Thor</Text>
        <Text>Golden Retriever</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>🐱 Luna</Text>
        <Text>Siamês</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>🐶 Mel</Text>
        <Text>Shih-tzu</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F3FF',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },

});