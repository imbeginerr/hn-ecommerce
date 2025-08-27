/** When your routing table is too long, you can split it into small modules. **/

import ItemRouter from '#/routers/item/item'
export default {
  path: '/item',
  redirect: 'noRedirect',
  name: 'Item',
  meta: {
    title: 'Quản lý sản phẩm'
  },
  children: [
    ItemRouter,
  ]
}

