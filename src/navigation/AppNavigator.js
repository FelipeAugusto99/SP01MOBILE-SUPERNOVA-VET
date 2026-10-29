import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { Carregando } from '../components';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import CadastroScreen from '../screens/CadastroScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PetDetailsScreen from '../screens/PetDetailsScreen';
import PetFormScreen from '../screens/PetFormScreen';
import PetsScreen from '../screens/PetsScreen';
import TutorDetailsScreen from '../screens/TutorDetailsScreen';
import TutorFormScreen from '../screens/TutorFormScreen';
import TutoresScreen from '../screens/TutoresScreen';

const Stack = createNativeStackNavigator();

function criarTemaNavegacao(cores, escuro) {
  const base = escuro ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: cores.primaria,
      background: cores.fundo,
      card: cores.superficie,
      text: cores.texto,
      border: cores.divisor,
    },
  };
}

function RotasPublicas() {
  const { cores } = useTema();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.primaria },
        headerTintColor: cores.textoSobrePrimaria,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{ title: 'Criar conta' }}
      />
    </Stack.Navigator>
  );
}

function RotasAutenticadas() {
  const { cores } = useTema();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.primaria },
        headerTintColor: cores.textoSobrePrimaria,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'SuperNova VET' }}
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
        options={({ route }) => ({
          title: route.params?.pet ? 'Editar Pet' : 'Cadastrar Pet',
        })}
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
        options={({ route }) => ({
          title: route.params?.tutor ? 'Editar Tutor' : 'Cadastrar Tutor',
        })}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { usuario, carregandoSessao } = useAuth();
  const { cores, escuro } = useTema();

  return (
    <NavigationContainer theme={criarTemaNavegacao(cores, escuro)}>
      <StatusBar style={usuario || escuro ? 'light' : 'dark'} />

      {carregandoSessao ? (
        <Carregando />
      ) : usuario ? (
        <RotasAutenticadas />
      ) : (
        <RotasPublicas />
      )}
    </NavigationContainer>
  );
}
