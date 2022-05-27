import { Role } from '../type';

const layout = () => import('../pages/layout.vue');
const imageList = () => import('../pages/DesignDraftManagement/imageList.vue');
const modelList = () => import('../pages/DesignDraftManagement/modelList.vue');
export const designDraftManagement = [
  {
    path: 'designDraftManagement',
    name: 'designDraftManagement',
    component: layout,
    meta: {
      icon: 'Upload',
      title: '设计管理',
      role: [Role.ADMIN, Role.DESIGNER],
    },
    children: [
      {
        path: 'imageList',
        name: 'imageList',
        component: imageList,
        meta: {
          title: '图片设计',
          role: [Role.ADMIN, Role.DESIGNER],
        },
      },
      {
        path: 'modelList',
        name: 'modelList',
        component: modelList,
        meta: {
          title: '模型设计',
          role: [Role.ADMIN, Role.DESIGNER],
        },
      },
    ],
  },
];
