// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import coreRoute from './core/index';
import itemRoute from './item/index';

/**
 * Note: Sub-menu only appears when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar (default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will become nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will not redirect in the breadcrumb
 * name: 'router-name'            the name is used by <keep-alive> (must set!!!)
 * meta: {
 *   roles: ['admin', 'editor']   control the page roles (you can set multiple roles)
 *   title: 'title'               the name shown in sidebar and breadcrumb (recommend set)
 *   icon: 'svg-name'             the icon shown in the sidebar
 *   noCache: true                if set true, the page will not be cached (default is false)
 *   affix: true                  if set true, the tag will affix in the tags-view
 *   breadcrumb: false            if set false, the item will be hidden in breadcrumb (default is true)
 *   activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
 * }
 */

/**
 * constantRoutes
 * A base page that does not have permission requirements
 * All roles can access
 */
export const constantRoutes = [
  {
    path: '/redirect',
    name: 'Redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('#/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('#/views/Login.vue'),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('#/views/Dashboard.vue'),
        name: 'Dashboard',
        meta: { title: 'Trang chủ', icon: 'dashboard', affix: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * The routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [coreRoute, itemRoute];

const createRouterInstance = () =>
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Use createWebHistory for Vue 3
    scrollBehavior: () => ({ top: 0 }), // Updated for Vue Router 4 (y -> top)
    routes: [...constantRoutes, ...asyncRoutes], // Combine constant and async routes
  });

const router = createRouterInstance();

// Function to reset router (recreate instance)
export function resetRouter() {
  const newRouter = createRouterInstance();
  router.resolve = newRouter.resolve; // Update resolve method
  router.getRoutes = newRouter.getRoutes; // Update getRoutes method
  router.options = newRouter.options; // Update options
  router.push = newRouter.push; // Update push method
  router.replace = newRouter.replace; // Update replace method
  router.go = newRouter.go; // Update go method
  router.back = newRouter.back; // Update back method
  router.forward = newRouter.forward; // Update forward method
}

export default router;