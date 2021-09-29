import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  title: 'general-tools',
  favicon:
    'https://cdn.jsdelivr.net/gh/innocces/DrawingBed/2021-9-12/1631376432067-general-logo.png',
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  cssLoader: { modules: false },
  dynamicImport: {},
  ...(process.env.BUILD_TARGET === 'GH'
    ? {
        publicPath: '/general-tools/',
        base: '/general-tools',
        history: { type: 'hash' },
      }
    : {}),
  ...(process.env.NODE_ENV === 'production'
    ? {}
    : {
        webpack5: {},
        esbuild: {
          target: 'es5',
        },
      }),
  mfsu: {},
  devServer: {
    host: '0.0.0.0',
    port: 12345,
    https: true,
  },
});
