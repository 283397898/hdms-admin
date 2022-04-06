<script setup lang="ts">
import { useRoute } from 'vue-router';
import { layoutTree } from '../../router';
import { useEmployeeStore } from '../../stores/EmployeeStore';
import logoImg from '../../assets/img/logo.png';

const { employee } = useEmployeeStore();
const route = useRoute();

function auth(item: any) {
  if ('meta' in item) {
    return !!item.meta.role.includes(employee.empRole);
  }
  return false;
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-h-full">
    <div style="width: 200px; height: 133px">
      <img :src="logoImg" alt="logo" />
    </div>
    <el-menu
      active-text-color="#eeeeee"
      background-color="#1C658C"
      text-color="#D8D2CB"
      :default-active="route.path"
      class="el-menu-vertical-demo tw-flex-1"
      router
    >
      <template v-for="item in layoutTree" :key="item.name">
        <el-sub-menu v-if="auth(item)" :index="item.path">
          <template #title>
            <component :is="item.meta.icon" class="el-icon"></component>
            <span>{{ item.meta.title }}</span>
          </template>
          <div v-for="children in item.children" :key="children.name">
            <el-menu-item
              v-if="auth(children)"
              :index="`/${item.path}/${children.path}`"
            >
              {{ children.meta.title }}
            </el-menu-item>
          </div>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.is-active {
  background-color: #398ab9;
}

.el-menu {
  border: 0;
}

:deep(.is-opened) > div > span {
  color: #eeeeee;
}
</style>
