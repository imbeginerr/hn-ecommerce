/** When your routing table is too long, you can split it into small roles. **/

export default {
  path: 'product',
  redirect: '/item/product/list',
  name: 'product',
  meta: {
    title: 'Sản phẩm'
  },
  children: [
    {
      path: 'list',
      name: 'productList',
      meta: {
        title: 'Danh sách product',
        activeMenu: '/product',
        component: 'item/product/list',
        breadcrumb: false
      },
      component: () => import('#/views/ecomerce/doituong/list.vue'),
      props: {
        backRouter: 'productList',
        formTitle: 'product',
        formType: 'list'
      },
      hidden: true
    },
    {
      path: 'create',
      name: 'productCreate',
      meta: {
        title: 'Thêm mới product',
        activeMenu: '/product',
        component: 'item/product/create',
        breadcrumb: false
      },
      component: () => import('#/views/ecomerce/doituong/create.vue'),
      props: {
        backRouter: 'productCreate',
        formTitle: 'product',
        formType: 'Create'
      },
      hidden: true
    },
    {
      path: 'edit/:id',
      name: 'productEdit',
      meta: {
        title: 'Danh sách product',
        activeMenu: '/product',
        component: 'item/product/edit',
        breadcrumb: false
      },
      component: () => import('#/views/ecomerce/doituong/edit.vue'),
      props: {
        backRouter: 'productEdit',
        formTitle: 'product',
        formType: 'edit'
      },
      hidden: true
    },
    {
      path: 'detail/:id(\\d+)',
      name: 'productDetail',
      meta: {
        title: 'Danh sách product',
        activeMenu: '/product',
        component: 'item/product/detail',
        breadcrumb: false
      },
      component: () => import('#/views/ecomerce/doituong/detail.vue'),
      props: {
        backRouter: 'productDetail',
        formTitle: 'product',
        formType: 'edit'
      },
      hidden: true
    }
  ]
}

