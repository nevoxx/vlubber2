<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { useMainStore } from './stores/main';
import { watch } from 'vue';
import socketManager from './socket/socket';

// Access the store
const mainStore = useMainStore();

// Use the router instance
const router = useRouter();

// Watch the accessToken value for changes
watch(
  () => mainStore.accessToken,
  (newToken: string) => {
    console.log(`token changed: ${mainStore.accessToken}`);

    if (newToken) {
      mainStore.connectionStatus = 1;
    }
  },
);

watch(
  () => mainStore.connectionStatus,
  (connectionStatus: Number) => {
    console.log('watch ...');
    switch (connectionStatus) {
      case 0:
        router.push({ name: 'login' });
        break;
      case 1:
        socketManager.connect();
        router.push({ name: 'loading' });
        break;
      case 2:
        router.push({ name: 'server' });
        break;
      default:
        alert(`Unknown Connection Status: ${connectionStatus}`);
        break;
    }
  },
);
</script>

<template>
  <main class="flex flex-col w-screen h-screen overflow-hidden">
    <RouterView />
  </main>
</template>
