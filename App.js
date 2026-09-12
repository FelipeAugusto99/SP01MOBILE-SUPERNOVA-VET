import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import PetDetailsScreen from './src/screens/PetDetailsScreen';
import PetFormScreen from './src/screens/PetFormScreen';
import PetsScreen from './src/screens/PetsScreen';
import TutorDetailsScreen from './src/screens/TutorDetailsScreen';
import TutorFormScreen from './src/screens/TutorFormScreen';
import TutoresScreen from './src/screens/TutoresScreen';

import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

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
        headerStyle: { backgroundColor: '#6C63FF' },
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
        name="PetDetails"
        component={PetDetailsScreen}
        options={{ title: 'Detalhes do Pet' }}
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
        name="TutorDetails"
        component={TutorDetailsScreen}
        options={{ title: 'Detalhes do Tutor' }}
      />

      <Stack.Screen
        name="TutorForm"
        component={TutorFormScreen}
        options={{ title: 'Cadastrar Tutor' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}