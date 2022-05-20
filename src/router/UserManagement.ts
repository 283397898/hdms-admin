import { Role } from '../type';

const layout = () => import('../pages/layout.vue');
const userList = () => import('../pages/UserManagement/UserList.vue');
const projectList = () => import('../pages/UserManagement/ProjectList.vue');
export const userManagement = [
  {
    path: 'userManagement',
    name: 'userManagement',
    component: layout,
    meta: {
      icon: 'Aim',
      title: '项目管理',
      role: [Role.ADMIN, Role.SERVICE],
    },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: userList,
        meta: {
          title: '用户管理',
          role: [Role.ADMIN, Role.SERVICE],
        },
      },
      {
        path: 'projectList',
        name: 'projectList',
        component: projectList,
        meta: {
          title: '项目管理',
          role: [Role.ADMIN, Role.SERVICE],
        },
      },
    ],
  },
];
