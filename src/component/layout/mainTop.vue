<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { usePagesStore } from '../../stores/PagesStore';

const router = useRouter();
const route = useRoute();
const { openPages } = usePagesStore();

// 处理标签关闭
function handleClose(path: string) {
  const index = openPages.findIndex((item) => item.path === path);

  const del = openPages.splice(index, 1);
  // 在此页面则跳转
  if (route.name === del[0].name) {
    if (openPages.length === 0) {
      // 无标签跳转到main页面
      router.push({ name: 'home' });
    } else if (openPages.length === index) {
      // 关最后一个标签后跳转前一个标签
      router.push({ name: openPages[index - 1].name });
    } else {
      // 关标签后跳转后一个标签（index不变）
      router.push({ name: openPages[index].name });
    }
  }
}
function toUrl(tag: any) {
  router.push({ name: openPages[tag.index].name });
}
</script>

<template>
  <div style="display: flex; background-color: #1c658c">
    <div style="height: 60px; flex: 1; display: flex; align-items: center">
      <el-tabs
        type="card"
        closable
        @tab-click="toUrl"
        @tab-remove="handleClose"
      >
        <el-tab-pane
          v-for="item in openPages"
          :key="item.name"
          style="height: 60px"
          :label="item.meta.title"
          :name="item.path"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-tabs) {
  height: 60px;
}
:deep(.el-tabs__item.is-active) {
  color: #eeeeee;
  background-color: #398ab9;
}
:deep(.el-tabs__item) {
  height: 60px;
  line-height: 60px;
  border-bottom: none !important;
}
:deep(.el-tabs__header) {
  margin-bottom: 0;
  border-bottom: none;
}
:deep(.el-tabs__nav) {
  border-top: none !important;
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
}
:deep(.el-tabs__content) {
  display: none;
}
</style>
