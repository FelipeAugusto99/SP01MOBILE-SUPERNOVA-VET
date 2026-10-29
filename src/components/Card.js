import { TouchableOpacity, View } from 'react-native';

import { useEstilos } from '../theme/useEstilos';

export default function Card({ children, onPress, style }) {
  const styles = useEstilos(criarEstilos);

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const criarEstilos = (cores) => ({
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: cores.sombra,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
});
