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
      component: () => import('#/views/core/item/list.vue'),
      props: {
        backRouter: 'productList',
        formTitle: 'product',
        formType: 'list'
      },
      hidden: true
    }
  ]
}

