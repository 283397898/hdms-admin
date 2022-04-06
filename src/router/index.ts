import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { employeeManagement } from './EmployeeManagement';

export const layoutTree = [...employeeManagement];
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: () => import('../App.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../pages/login.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../pages/layout.vue'),
      },
      ...layoutTree,
    ],
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
