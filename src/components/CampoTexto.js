import { Text, TextInput, View } from 'react-native';

import { useTema } from '../context/TemaContext';
import { useEstilos } from '../theme/useEstilos';

export default function CampoTexto({ label, style, ...inputProps }) {
  const { cores } = useTema();
  const styles = useEstilos(criarEstilos);

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={cores.textoTerciario}
        {...inputProps}
      />
    </View>
  );
}

const criarEstilos = (cores) => ({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: 6,
  },

  input: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: cores.texto,
  },
});
