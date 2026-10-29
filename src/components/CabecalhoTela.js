import { Text, View } from 'react-native';

import { useEstilos } from '../theme/useEstilos';

export default function CabecalhoTela({ titulo, subtitulo, acao }) {
  const styles = useEstilos(criarEstilos);

  return (
    <View style={styles.container}>
      <View style={styles.textos}>
        <Text style={styles.titulo}>
          {titulo}
        </Text>

        {subtitulo ? (
          <Text style={styles.subtitulo}>
            {subtitulo}
          </Text>
        ) : null}
      </View>

      {acao}
    </View>
  );
}

const criarEstilos = (cores) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  textos: {
    flex: 1,
    marginRight: 10,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: cores.texto,
  },

  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 4,
  },
});
