import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_SESSAO = '@supernovavet:sessao';

export async function salvarSessao(sessao) {
  await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
}

export async function carregarSessao() {
  const sessao = await AsyncStorage.getItem(CHAVE_SESSAO);
  return sessao ? JSON.parse(sessao) : null;
}

export async function removerSessao() {
  await AsyncStorage.removeItem(CHAVE_SESSAO);
}
