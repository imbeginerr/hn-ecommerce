/** When your routing table is too long, you can split it into small roles. **/

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
        title: 'Danh sách quyền',
        activeMenu: '/core/role',
        component: 'core/role/list',
        breadcrumb: false
      },
      props: {
        backRouter: 'CoreRoleList',
        formTitle: 'Quyền',
        formType: 'list'
      },
      hidden: true
    },
    {
      path: 'create',
      name: 'CoreRoleCreate',
      meta: {
        title: 'Thêm mới quyền',
        activeMenu: '/core/role',
        component: 'core/role/create',
        breadcrumb: false
      },
      props: {
        backRouter: 'CoreRoleList',
        formTitle: 'Quyền',
        formType: 'create'
      },
      hidden: true
    }

  ]
}

