import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TutorDetailsScreen({
  route,
  navigation,
}) {
  const { tutor } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.icone}>
        <Text style={styles.iconeTexto}>
          {tutor.nome?.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.nome}>
        {tutor.nome}
      </Text>

      <Text style={styles.perfil}>
        {tutor.perfil || 'Tutor'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          E-mail
        </Text>

        <Text style={styles.valor}>
          {tutor.email}
        </Text>

        <Text style={styles.label}>
          Telefone
        </Text>

        <Text style={styles.valor}>
          {tutor.telefone}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() =>
          navigation.navigate('TutorForm', {
            tutor,
          })
        }
      >
        <Text style={styles.textoBotaoEditar}>
          Editar Tutor
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotaoVoltar}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5FF',
    padding: 25,
    alignItems: 'center',
  },

  icone: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },

  iconeTexto: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#6C63FF',
  },

  nome: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#29254A',
    textAlign: 'center',
  },

  perfil: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  label: {
    fontSize: 11,
    color: '#9995AA',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  valor: {
    fontSize: 16,
    color: '#403B5C',
    marginBottom: 20,
  },

  botaoEditar: {
    width: '100%',
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  textoBotaoEditar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoVoltar: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});