import { Text, View } from 'react-native';

import { useEstilos } from '../theme/useEstilos';

export default function Icone({ conteudo, tamanho = 52, style }) {
  const styles = useEstilos(criarEstilos);

  return (
    <View
      style={[
        styles.caixa,
        {
          width: tamanho,
          height: tamanho,
          borderRadius: tamanho * 0.3,
        },
        style,
      ]}
    >
      <Text style={[styles.conteudo, { fontSize: tamanho * 0.48 }]}>
        {conteudo}
      </Text>
    </View>
  );
}

const criarEstilos = (cores) => ({
  caixa: {
    backgroundColor: cores.superficieDestaque,
    justifyContent: 'center',
    alignItems: 'center',
  },

  conteudo: {
    fontWeight: 'bold',
    color: cores.primaria,
  },
});
