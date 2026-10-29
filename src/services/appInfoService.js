import Constants from 'expo-constants';

import api from './api';

export function obterInformacoesApp() {
  const config = Constants.expoConfig ?? {};
  const commitHash = config.extra?.commitHash ?? 'desconhecido';

  return {
    nome: config.name ?? 'SuperNova VET',
    versao: config.version ?? '-',
    commitHash,
    commitCurto: commitHash.slice(0, 7),
    urlApi: api.defaults.baseURL,
  };
}
