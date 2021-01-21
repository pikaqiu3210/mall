import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/home/Home'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const ShopCart = () => import('../views/cart/ShopCart')
const ProFile = () => import('../views/profile/ProFile')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [

  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',

    component: Home
  },
  {
    path: '/category',

    component: Category
  },
  {
    path: '/cart',

    component: ShopCart
  },
  {
    path: '/profile',

    component: ProFile
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
