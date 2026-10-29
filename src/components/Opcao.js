import { Text, TouchableOpacity } from 'react-native';

import { useEstilos } from '../theme/useEstilos';

export default function Opcao({
  titulo,
  descricao,
  selecionada,
  onPress,
  style,
}) {
  const styles = useEstilos(criarEstilos);

  return (
    <TouchableOpacity
      style={[styles.opcao, selecionada && styles.selecionada, style]}
      onPress={onPress}
    >
      <Text style={[styles.titulo, selecionada && styles.textoSelecionado]}>
        {titulo}
      </Text>

      {descricao ? (
        <Text style={[styles.descricao, selecionada && styles.textoSelecionado]}>
          {descricao}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const criarEstilos = (cores) => ({
  opcao: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    padding: 12,
    backgroundColor: cores.superficie,
  },

  selecionada: {
    borderColor: cores.primaria,
    backgroundColor: cores.superficieDestaque,
  },

  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.texto,
  },

  descricao: {
    fontSize: 12,
    color: cores.textoSecundario,
    marginTop: 4,
  },

  textoSelecionado: {
    color: cores.primaria,
  },
});
