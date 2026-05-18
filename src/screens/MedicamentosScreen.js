import { StyleSheet, Text, View } from 'react-native';

export default function MedicamentosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicamentos</Text>

      <Text style={styles.card}>Vermífugo - 1x ao dia</Text>
      <Text style={styles.card}>Antibiótico - 12 em 12 horas</Text>
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});