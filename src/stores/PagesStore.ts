import { reactive, watch } from 'vue';
import { defineStore } from 'pinia';

export const usePagesStore = defineStore('usePagesStore', () => {
  const openPages = reactive<any[]>([]);
  function addOpenPage(route: any) {
    const { name, meta } = route;
    openPages.push({ name, meta });
  }
  watch(openPages, () => {
    localStorage.pages = JSON.stringify(openPages);
  });
  return {
    addOpenPage,
    openPages,
  };
});
