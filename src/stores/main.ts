import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia';
import socketManager from '@/socket/socket'
import { ConnectionStatus } from '@/enums/ConnectionStatus'

export const useMainStore = defineStore('main', () => {
  const serverAddress = ref<string>('http://localhost:3333');
  const accessToken = ref<string>(localStorage.getItem('accessToken') || '');
  const refreshToken = ref<string>(localStorage.getItem('refreshToken') || '');
  const connectionStatus = ref<ConnectionStatus>(ConnectionStatus.INITIAL);

  watch(accessToken, (newToken: string) => {
    console.log(`accessToken changed: ${newToken}`);
    localStorage.setItem('accessToken', newToken);

    // Set status to connecting, so we reconnect the socket with the new token
    connectionStatus.value = ConnectionStatus.CONNECTING;
  });

  watch(refreshToken, (newToken: string) => {
    console.log(`refreshToken changed: ${newToken}`);
    localStorage.setItem('refreshToken', newToken);
  });

  watch(connectionStatus, (status) => {
    console.log(`connectionStatus changed: ${connectionStatus.value}`)
    if (status === ConnectionStatus.CONNECTING) {
      socketManager.connect()
    } else if (status === ConnectionStatus.DISCONNECTED) {
      socketManager.disconnect();
      accessToken.value = '';
      refreshToken.value = '';
      connectionStatus.value = ConnectionStatus.INITIAL;
    }
  });

  onMounted(() => {
    console.log("mainStore @ onMounted")
    if (accessToken.value && refreshToken.value) {
      connectionStatus.value = ConnectionStatus.CONNECTING;
    }
  });

  return {
    connectionStatus,
    serverAddress,
    accessToken,
    refreshToken,
  };
});
