import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import { coresClaras, coresEscuras } from '../theme/cores';

const CHAVE_TEMA = '@supernovavet:tema';

export const PREFERENCIAS_TEMA = ['sistema', 'claro', 'escuro'];

const TemaContext = createContext();

export function TemaProvider({ children }) {
  const esquemaSistema = useColorScheme();
  const [preferencia, setPreferencia] = useState('sistema');

  useEffect(() => {
    AsyncStorage.getItem(CHAVE_TEMA)
      .then((salva) => {
        if (PREFERENCIAS_TEMA.includes(salva)) {
          setPreferencia(salva);
        }
      })
      .catch(() => {});
  }, []);

  function alterarPreferencia(novaPreferencia) {
    setPreferencia(novaPreferencia);
    AsyncStorage.setItem(CHAVE_TEMA, novaPreferencia).catch(() => {});
  }

  const escuro =
    preferencia === 'sistema'
      ? esquemaSistema === 'dark'
      : preferencia === 'escuro';

  return (
    <TemaContext.Provider
      value={{
        cores: escuro ? coresEscuras : coresClaras,
        escuro,
        preferencia,
        alterarPreferencia,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}
