<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
   metaInfo: {
     title: process.env.VUE_APP_SERVER_NAME,
     titleTemplate: '%s - RolePlay'
   }
}
</script>

<style lang="scss">
body {
  color: rgba(255, 255, 255, 0.7) !important;
  background-color: #34383c !important;
}

#app {
  color: #2c3e50;
}
</style>
