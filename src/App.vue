<template>
  <div style="display: flex;">
    <Navbar />
    <div style="flex: 1; padding: 20px;">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>
