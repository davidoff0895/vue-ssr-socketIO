<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Toasted from 'vue-toasted'
  import toastOptions from '@/client/common/toasted/options'

  Vue.use(Toasted, toastOptions)

  @Component({
    name: 'root-app'
  })
  export default class RootApp extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>
