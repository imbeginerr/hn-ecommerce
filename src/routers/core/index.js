import CoreRoleRouter from '#/routers/core/role';
import CoreUserRouter from '#/routers/core/user';
export default {
  path: '/core',
  redirect: 'noRedirect',
  name: 'Core',
  meta: {
    title: 'Quản trị hệ thống',
  },
  children: [CoreRoleRouter, CoreUserRouter],
};