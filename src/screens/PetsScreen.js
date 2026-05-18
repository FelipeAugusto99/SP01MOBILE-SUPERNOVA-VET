import { StyleSheet, Text, View } from 'react-native';

export default function PetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pets Cadastrados</Text>

      <Text style={styles.card}>Thor</Text>
      <Text style={styles.card}>Luna</Text>
      <Text style={styles.card}>Mel</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#6C63FF',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
  },
});