import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './src/config/queryClient';
import { AuthProvider } from './src/context/AuthContext';
import { TemaProvider } from './src/context/TemaContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TemaProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </TemaProvider>
    </QueryClientProvider>
  );
}
