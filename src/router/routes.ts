import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/', redirect: '/login' },
      { path: 'login', component: () => import('src/pages/LoginPage.vue') },
      {
        path: 'register',
        component: () => import('src/pages/RegisterPage.vue'),
      },
    ],
    meta: { auth: false },
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'mitglieder',
        component: () => import('pages/MembersPage.vue'),
      },
      {
        path: 'trainingsplaene',
        component: () => import('pages/TrainingPlansPage.vue'),
      },
      {
        path: 'trainingsfortschritt',
        component: () => import('pages/TrainingProgressPage.vue'),
      },
      {
        path: 'auftritte',
        component: () => import('pages/ShowActsPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
