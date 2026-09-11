import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from './src/screens/CadastroScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MedicamentosScreen from './src/screens/MedicamentosScreen';
import PetFormScreen from './src/screens/PetFormScreen';
import PetsScreen from './src/screens/PetsScreen';
import TutoresScreen from './src/screens/TutoresScreen';
import VacinasScreen from './src/screens/VacinasScreen';

import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6C63FF',
        },
        headerTintColor: '#fff',
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
        name="PetForm"
        component={PetFormScreen}
        options={{ title: 'Cadastrar Pet' }}
      />

      <Stack.Screen
        name="Tutores"
        component={TutoresScreen}
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
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}