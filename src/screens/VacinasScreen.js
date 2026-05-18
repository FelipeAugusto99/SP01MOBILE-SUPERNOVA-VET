import { StyleSheet, Text, View } from 'react-native';

export default function VacinasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vacinas</Text>

      <Text style={styles.card}>V10 - Próxima dose: 10/10/2026</Text>
      <Text style={styles.card}>Antirrábica - 02/02/2027</Text>
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