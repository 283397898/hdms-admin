<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLeft from '../component/layout/mainLeft.vue';
import MainTop from '../component/layout/mainTop.vue';
import { usePagesStore } from '../stores/PagesStore';

const { addOpenPage, openPages } = usePagesStore();
const route = useRoute();
const router = useRouter();
onMounted(() => {
  router.push({ name: 'home' });
});
/*
 *  判断添加标签规则1：标签是否存在
 *  判断添加标签规则2：标签是否有标题
 *  标签数组为全局状态，在main组件下的子路由都应有标题
 */
watch(
  () => route.path,
  () => {
    let isAdd = true;
    openPages.forEach((item) => {
      if (item.name === route.name) {
        isAdd = false;
      }
    });
    if (route.meta.title !== undefined && isAdd) {
      addOpenPage(route);
    }
  },
);
</script>

<template>
  <div class="tw-h-screen">
    <el-container>
      <el-aside width="200px">
        <main-left />
      </el-aside>
      <el-container>
        <el-header>
          <main-top />
        </el-header>
        <el-main class="main">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  padding: 0;
}

.el-container {
  height: 100%;
}

.main {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2) inset;
}
</style>
