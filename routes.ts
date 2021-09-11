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
      { component: '@/pages/404' },
    ],
  },
];

export default routes;
