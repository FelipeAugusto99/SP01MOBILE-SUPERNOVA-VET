import { Text, View } from 'react-native';

import { useEstilos } from '../theme/useEstilos';

export default function BadgeRisco({ nivel }) {
  const styles = useEstilos(criarEstilos);

  return (
    <View style={[styles.badge, styles[`fundo_${nivel}`]]}>
      <Text style={[styles.texto, styles[`texto_${nivel}`]]}>
        {nivel}
      </Text>
    </View>
  );
}

const criarEstilos = (cores) => ({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  texto: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  fundo_BAIXO: {
    backgroundColor: cores.sucessoFundo,
  },

  texto_BAIXO: {
    color: cores.sucesso,
  },

  fundo_MEDIO: {
    backgroundColor: cores.alertaFundo,
  },

  texto_MEDIO: {
    color: cores.alerta,
  },

  fundo_ALTO: {
    backgroundColor: cores.perigoFundo,
  },

  texto_ALTO: {
    color: cores.perigo,
  },
});
