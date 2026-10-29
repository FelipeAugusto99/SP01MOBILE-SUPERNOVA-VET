import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useTema } from '../context/TemaContext';
import { useEstilos } from '../theme/useEstilos';

export default function Botao({
  titulo,
  onPress,
  variante = 'primario',
  carregando = false,
  disabled = false,
  compacto = false,
  style,
}) {
  const { cores } = useTema();
  const styles = useEstilos(criarEstilos);

  const corIndicador = {
    contorno: cores.primaria,
    contornoPerigo: cores.perigo,
  }[variante] || cores.textoSobrePrimaria;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        compacto && styles.compacto,
        styles[variante],
        (disabled || carregando) && styles.desabilitado,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || carregando}
      activeOpacity={0.8}
    >
      {carregando ? (
        <ActivityIndicator color={corIndicador} />
      ) : (
        <Text
          style={[
            styles.texto,
            compacto && styles.textoCompacto,
            styles[`texto_${variante}`],
          ]}
        >
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const criarEstilos = (cores) => ({
  base: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  compacto: {
    width: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 0,
  },

  primario: {
    backgroundColor: cores.primaria,
  },

  perigo: {
    backgroundColor: cores.perigo,
  },

  contorno: {
    borderWidth: 1,
    borderColor: cores.primaria,
  },

  contornoPerigo: {
    borderWidth: 1,
    borderColor: cores.perigo,
  },

  desabilitado: {
    opacity: 0.6,
  },

  texto: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  textoCompacto: {
    fontSize: 13,
  },

  texto_primario: {
    color: cores.textoSobrePrimaria,
  },

  texto_perigo: {
    color: cores.textoSobrePrimaria,
  },

  texto_contorno: {
    color: cores.primaria,
  },

  texto_contornoPerigo: {
    color: cores.perigo,
  },
});
