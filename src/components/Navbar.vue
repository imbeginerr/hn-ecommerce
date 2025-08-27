<template>
  <div v-if="isAuthenticated" class="vertical-menu">
    <b-nav vertical class="bg-dark text-white d-flex flex-column h-100">
      <div class="flex-grow-1 w-100">
        <div class="p-3">
          <b-nav-item :active="activeMenu === 'Dashboard'" :to="getFullPath({ path: '/' }, { path: 'dashboard' })">
            <b-icon icon="house" class="mr-2" />
            {{ getRouteTitle('Dashboard') }}
          </b-nav-item>
          <b-nav-item-dropdown v-for="route in filteredMainRoutes" :key="route.name" :text="route.meta.title"
            :class="{ active: activeMenu === route.name }">
            <b-dropdown-item v-for="child in filteredChildren(route)" :key="child.name" :to="getFullPath(route, child)"
              :active="activeMenu === child.name">
              {{ child.meta.title }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </div>
      <div class="logout-container">
        <b-nav-item class="logout-item" @click="logout">
          <b-icon icon="box-arrow-right" class="mr-2" />
          Đăng xuất
        </b-nav-item>
      </div>
    </b-nav>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { BNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue-next';

// Lấy router và route
const router = useRouter();
const route = useRoute();

// Reactive token state
const authToken = ref(localStorage.getItem('authToken'));

// Kiểm tra trạng thái đăng nhập
const isAuthenticated = computed(() => !!authToken.value);

// Watch for route changes to update authToken
watch(
  () => route.path,
  () => {
    authToken.value = localStorage.getItem('authToken');
  }
);

// Lọc các route chính có meta.title và children hiển thị
const filteredMainRoutes = computed(() =>
  router.getRoutes().filter(
    (route) =>
      route.meta?.title &&
      route.name !== 'Login' &&
      route.name !== 'Dashboard' &&
      !route.redirect?.startsWith('/login') &&
      route.path !== '/:catchAll(.*)' &&
      route.children &&
      route.children.length &&
      route.children.some((child) => !child.hidden)
  )
);

const getFullPath = (route, child) => {
  let fullPath = '';
  // Handle direct children
  fullPath = `${route.path}/${child.path}`;
  fullPath = fullPath.replace(/\/+/g, '/'); // Remove duplicate slashes
  console.log('Full path for', child.name, ':', fullPath);
  return fullPath;
};

// Lọc children không có hidden: true cho mỗi route
const filteredChildren = (route) => {
  return route.children.filter((child) => !child.hidden);
};

// Xác định menu đang active
const activeMenu = computed(() => {
  const currentRoute = route;
  const matchedRoute = currentRoute.matched.find((record) => record.meta.activeMenu);
  return matchedRoute ? matchedRoute.meta.activeMenu : currentRoute.name;
});

// Lấy title của route theo name
const getRouteTitle = (name) => {
  const route = router.getRoutes().find((r) => r.name === name);
  return route?.meta?.title || name;
};

// Hàm đăng xuất
const logout = () => {
  localStorage.removeItem('authToken');
  authToken.value = null; // Update reactive state
  router.push({ name: 'Login' });
};
</script>

<style scoped>
.vertical-menu {
  width: 200px;
  min-height: 100vh;
  /* Ensure full viewport height */
  background-color: #001529;
  display: flex;
  flex-direction: column;
}

.b-nav {
  flex: 1 1 auto;
  /* Allow the nav to grow and shrink */
  display: flex;
  flex-direction: column;
}

.flex-grow-1 {
  flex-grow: 1;
  /* Push the logout container to the bottom */
}

.logout-container {
  padding: 10px;
  /* Add some padding for better spacing */
  border-top: 1px solid #333;
  /* Optional: Add a separator line */
}

.nav {
  padding: 0;
}

.nav-item .nav-link {
  color: #fff;
  display: flex;
  align-items: center;
}

.nav-item .nav-link:hover,
.nav-item .nav-link.active {
  color: #ffd04b;
}

.b-icon {
  margin-right: 8px;
}

.dropdown-menu {
  background-color: #001529;
}

.dropdown-item {
  color: #fff;
}

.dropdown-item:hover,
.dropdown-item.active {
  color: #ffd04b;
  background-color: #1a2a44;
}

.logout-item .nav-link {
  background-color: #ff4d4f;
  border-radius: 5px;
  padding: 8px 12px;
  width: 100%;
  /* Ensure it spans the full width of the menu */
  text-align: center;
}

.logout-item .nav-link:hover {
  background-color: #ff7875;
}
</style>