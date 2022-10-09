import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './routes/login'
import chat from './routes/chat'

Vue.use(VueRouter)

const routes = [
  login,
  chat,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
