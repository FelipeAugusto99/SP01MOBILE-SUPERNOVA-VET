import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CANAL_PETS_CRITICOS = 'pets-criticos';
const suportado = Platform.OS !== 'web';

if (suportado) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function prepararNotificacoes() {
  if (!suportado) {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CANAL_PETS_CRITICOS, {
      name: 'Pets em situação crítica',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const { status } = await Notifications.getPermissionsAsync();

  if (status === 'granted') {
    return true;
  }

  const { status: novoStatus } = await Notifications.requestPermissionsAsync();
  return novoStatus === 'granted';
}

export async function notificarPetCritico(pet) {
  if (!suportado) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⚠️ Pet em situação crítica',
      body: `${pet.nome} (${pet.especie}) está com nível de risco ALTO. Toque para ver os detalhes.`,
      data: {
        tipo: 'PET_CRITICO',
        pet,
      },
    },
    trigger: Platform.OS === 'android'
      ? { channelId: CANAL_PETS_CRITICOS }
      : null,
  });
}

export function ouvirToqueNotificacao(aoTocar) {
  if (!suportado) {
    return () => {};
  }

  function tratarResposta(resposta) {
    if (!resposta) {
      return;
    }

    aoTocar(resposta.notification.request.content.data);
    Notifications.clearLastNotificationResponse();
  }

  tratarResposta(Notifications.getLastNotificationResponse());

  const assinatura = Notifications.addNotificationResponseReceivedListener(
    tratarResposta
  );

  return () => assinatura.remove();
}
