/** When your routing table is too long, you can split it into small users. **/

export default {
  path: 'role',
  redirect: '/core/role/list',
  name: 'CoreRole',
  meta: {
    title: 'Quyền'
  },
  children: [
    {
      path: 'list',
      name: 'CoreRoleList',
      meta: {
        title: 'Danh sách Quyền',
        activeMenu: '/core/role',
        component: 'core/role/list',

        breadcrumb: false
      },
      component: () => import('#/views/core/role/list.vue'),
      props: {
        backRouter: 'CoreRoleList',
        formTitle: 'Quyền',
        formType: 'list'
      },
      hidden: true
    }
  ]
}

