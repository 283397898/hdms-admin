<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { getLogin } from './apis/login';
import { useEmployeeStore } from './stores/EmployeeStore';

const router = useRouter();
const route = useRoute();
const { setEmployee, employee } = useEmployeeStore();
onMounted(() => {
  router.push({ name: 'login' });
  if (localStorage.token !== 'null') {
    if (employee.empId === undefined) {
      getLogin()
        .then((r) => {
          setEmployee(r.data);
          console.log(route.path);
          if (route.name === 'login') {
            router.push({ name: 'home' });
          }
        })
        .catch(() => {
          localStorage.token = 'null';
          router.push({ name: 'login' });
        });
    } else if (route.name === 'login') {
      router.push({ name: 'home' });
    }
  } else {
    console.log('err');
    router.push({ name: 'login' });
  }
});
</script>

<template class="tw-h-screen">
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
