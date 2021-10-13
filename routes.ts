const routes = [
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', component: '@/pages/index', exact: true },
      {
        path: '/compress-image',
        component: '@/pages/compressImage',
        exact: true,
      },
      {
        path: '/drawer-bed',
        component: '@/pages/drawerBed',
        exact: true,
      },
      {
        path: '/base-64',
        component: '@/pages/base-64',
        exact: true,
      },
      { component: '@/pages/404' },
    ],
  },
];

export default routes;
