import { focusManager, QueryClient } from '@tanstack/react-query';
import { AppState, Platform } from 'react-native';

if (Platform.OS !== 'web') {
  focusManager.setEventListener((definirFoco) => {
    const assinatura = AppState.addEventListener('change', (estado) => {
      definirFoco(estado === 'active');
    });

    return () => assinatura.remove();
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});
