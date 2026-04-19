<script setup lang="ts">
  import Menu from './components/Menu.vue';

</script>

<template>
  <Menu></Menu>
  <div class="container">
    <router-view></router-view>
  </div>

</template>

<style scoped>

  .container{
    margin: 25px auto;
  }

</style>
