import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainpage',
      meta: { title: '首页' },
      component: () => import('../views/MainPage.vue')
    },
    {
      path: '/toollist',
      name: 'toollist',
      meta: { title: '列表' },
      component: () => import('../views/ToolList.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      meta: { title: '详情' },
      component: () => import('../views/Detail.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
