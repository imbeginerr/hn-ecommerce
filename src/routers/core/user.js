/** When your routing table is too long, you can split it into small users. **/

export default {
  path: 'user',
  redirect: '/core/user/list',
  name: 'CoreUser',
  meta: {
    title: 'Tài khoản'
  },
  children: [
    {
      path: 'list',
      name: 'CoreUserList',
      meta: {
        title: 'Danh sách tài khoản',
        activeMenu: '/core/user',
        component: 'core/user/list',

        breadcrumb: false
      },
      component: () => import('#/views/core/user/list.vue'),
      props: {
        backRouter: 'CoreUserList',
        formTitle: 'Tài khoản',
        formType: 'list'
      },
      hidden: true
    }
  ]
}

