import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminComponent from '../components/admin/AdminComponent'
import CategoriesComponent from '../components/admin/pages/categories/CategoriesComponent'
import DashboardComponent from '../components/admin/pages/dashboard/DashboardComponent'

Vue.use(VueRouter)

//Aqui ficará as nossas rotas
const routes = [
    //Roteamento para agrupar as rotas de admin
    {
        path: '/admin', 
        component:AdminComponent,
        children:[
            {
                path: 'categories',
                component: CategoriesComponent,
                name: 'admin.categories'
            }, {
                path: '',
                component: DashboardComponent,
                name: 'admin.dashboard'
            }
        ]
    },
    
]

const router = new VueRouter({   
    routes
})

export default router