import Vue from 'vue'
import Router, {RouteConfig} from 'vue-router'

const INFO_TABLE = () => import(/* webpackChunkName: "InfoTable" */'client/templates/info-table.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    component: INFO_TABLE,
    name: 'info-table',
    path: '/'
  }
]

export default new Router({ routes })
