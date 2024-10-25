<template>
  <div class="server">
    <h1 class="text-4xl">This is the server page</h1>
  </div>

  <div class="mt-4">
    <button
      type="button"
      class="px-2 py-1 border rounded bg-red-500 text-white cursor-pointer hover:bg-red-600"
      @click="disconnect"
    >
      Sign out
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { ConnectionStatus } from '@/enums/ConnectionStatus'

const mainStore = useMainStore();

function disconnect() {
  mainStore.connectionStatus = ConnectionStatus.DISCONNECTED;
}
</script>
