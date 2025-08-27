<template>
  <productForm :id="$route.params.id" :is-edit="false"/>
</template>
<script setup>
import productForm from './components/Form.vue';
</script>