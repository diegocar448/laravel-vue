import Vue from 'vue'
import VueRouter from 'vue-router'

import CategoriesComponent from '../components/admin/pages/categories/CategoriesComponent'
import DashboardComponent from '../components/admin/pages/dashboard/DashboardComponent'

Vue.use(VueRouter)

const routes = [
    {path: '/categories', component: CategoriesComponent, name:'categories'},
    {path: '/', component: DashboardComponent, name:'dashboard'}

]

const router = new VueRouter({
    routes
})

export default router
