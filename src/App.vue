<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { getLogin } from './apis/login';
import { useEmployeeStore } from './stores/EmployeeStore';

const router = useRouter();
const route = useRoute();
const { setEmployee } = useEmployeeStore();
if (localStorage.getItem('token')) {
  getLogin()
    .then((r) => {
      setEmployee(r.data);
      if (route.name === 'login') {
        router.push({ name: 'home' });
      }
    })
    .catch(() => {
      localStorage.token = null;
      router.push({ name: 'login' });
    });
} else {
  console.log('err');
  router.push({ name: 'login' });
}
</script>

<template class="tw-h-screen">
  <router-view></router-view>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
