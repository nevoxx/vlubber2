<script setup lang="ts">
import { useMainStore } from './stores/main';
import LoginView from '@/views/LoginView.vue'
import LoadingView from '@/views/LoadingView.vue'
import ServerView from '@/views/ServerView.vue'
import { ConnectionStatus } from '@/enums/ConnectionStatus'

// Access the store
const mainStore = useMainStore();
</script>

<template>
  <main class="flex flex-col w-screen h-screen overflow-hidden">
    <LoginView v-if="mainStore.connectionStatus === ConnectionStatus.INITIAL" />
    <LoadingView v-if="mainStore.connectionStatus === ConnectionStatus.CONNECTING" />
    <ServerView v-if="mainStore.connectionStatus === ConnectionStatus.CONNECTED" />
  </main>
</template>
