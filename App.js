import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from './src/screens/CadastroScreen';
import HomeScreen from './src/screens/HomeScreen';
import MedicamentosScreen from './src/screens/MedicamentosScreen';
import PetsScreen from './src/screens/PetsScreen';
import VacinasScreen from './src/screens/VacinasScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6C63FF',
          },

          headerTintColor: '#fff',

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Pets"
          component={PetsScreen}
        />

        <Stack.Screen
          name="Vacinas"
          component={VacinasScreen}
        />

        <Stack.Screen
          name="Medicamentos"
          component={MedicamentosScreen}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}