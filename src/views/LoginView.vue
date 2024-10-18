<template>
  <div class="flex flex-1 items-center justify-center">
    <div class="flex flex-col gap-4 max-w-md w-full">
      <h1 class="text-3xl text-center mb-4">Login</h1>

      <input
        type="text"
        class="px-2 py-1 border rounded"
        v-model="form.serverAddress"
        placeholder="Server Address"
      />

      <input
        type="text"
        class="px-2 py-1 border rounded"
        v-model="form.username"
        placeholder="Username"
      />

      <input
        type="password"
        class="px-2 py-1 border rounded"
        v-model="form.password"
        placeholder="Password"
      />

      <button
        type="button"
        class="px-2 py-1 border rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
        @click="login"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();

const form = ref({
  serverAddress: mainStore.serverAddress,
  username: 'DebugUser#1',
  password: 'DebugUser#1',
});

async function login() {
  try {
    const response = await axios.post(`${form.value.serverAddress}/auth/token`, {
      username: form.value.username,
      password: form.value.password,
    });

    mainStore.accessToken = response.data.accessToken;
    mainStore.refreshToken = response.data.refreshToken;
  } catch (e) {
    console.log('e', e);
  }
}
</script>
