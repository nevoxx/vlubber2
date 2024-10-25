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

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();

const form = ref({
  serverAddress: mainStore.serverAddress,
  username: 'DebugUser#1',
  password: 'DebugUser#1',
});

async function login() {
  try {
    const response = await fetch(`${form.value.serverAddress}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.value.username,
        password: form.value.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    mainStore.accessToken = data.accessToken;
    mainStore.refreshToken = data.refreshToken;
  } catch (e) {
    console.log('e', e);
  }
}
</script>
