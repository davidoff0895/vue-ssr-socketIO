<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import router from './router'

@Component({
  name: 'server',
  router
})
export default class Server extends Vue {
  @Prop(Object)
  contentData: any

  created() {
    this.$router.push(this.contentData.path)
  }
}
</script>
