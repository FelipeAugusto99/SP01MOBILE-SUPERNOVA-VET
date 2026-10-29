import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

export function useAtualizarAoFocar(refetch) {
  const primeiroFoco = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (primeiroFoco.current) {
        primeiroFoco.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
}
