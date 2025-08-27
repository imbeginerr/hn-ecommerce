<template>
  <productForm :id="$route.params.id" :is-edit="true" />
</template>
<script setup>
import productForm from './components/Form.vue';

</script>