import AsyncStorage from '@react-native-async-storage/async-storage';

function chave(username) {
  return `@supernovavet:criticos-notificados:${username}`;
}

export async function carregarCriticosNotificados(username) {
  const ids = await AsyncStorage.getItem(chave(username));
  return ids ? JSON.parse(ids) : null;
}

export async function salvarCriticosNotificados(username, ids) {
  await AsyncStorage.setItem(chave(username), JSON.stringify(ids));
}
