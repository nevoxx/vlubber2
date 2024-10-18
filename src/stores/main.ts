import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const connectionStatus = ref<Number>(0);
  const serverAddress = ref<string>('https://api.blubber.me');
  const accessToken = ref<string>(localStorage.getItem('accessToken') || '');
  const refreshToken = ref<string>(localStorage.getItem('refreshToken') || '');

  watch(accessToken, (newToken: string) => {
    localStorage.setItem('accessToken', newToken);
  });

  watch(refreshToken, (newToken: string) => {
    localStorage.setItem('refreshToken', newToken);
  });

  return {
    connectionStatus,
    serverAddress,
    accessToken,
    refreshToken,
  };
});
