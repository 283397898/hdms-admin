import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as icons from '@element-plus/icons-vue';
import App from './App.vue';
import { router } from './router';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(ElementPlus);
Object.keys(icons).forEach((iconName) => {
  app.component(iconName, icons[iconName as keyof typeof icons]);
});
app.mount('#app');
