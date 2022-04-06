import { Role } from '../type';

const layout = () => import('../pages/layout.vue');
const empList = () => import('../pages/EmployeeManagement/EmployeeList.vue');
export const employeeManagement = [
  {
    path: 'employeeManagement',
    name: 'employeeManagement',
    component: layout,
    meta: {
      icon: 'Aim',
      title: '员工管理',
      role: [Role.ADMIN, Role.PERSONNEL],
    },
    children: [
      {
        path: 'employeeList',
        name: 'employeeList',
        component: empList,
        meta: {
          title: '员工列表',
          role: [Role.ADMIN, Role.PERSONNEL],
        },
      },
    ],
  },
];
