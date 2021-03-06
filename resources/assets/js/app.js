require('./bootstrap');
window.Vue = require('vue');
import Snotify from 'vue-snotify'

import router from './routes/routers'
import store from './vuex/store'

//Aqui desabilitamos o showProgressBar por padrão
Vue.use(Snotify, {toast:{showProgressBar:false}})


/**
 * Components globais
 */
Vue.component('admin-component', require('./components/admin/AdminComponent'))
Vue.component('preloader-component', require('./components/layouts/PreloaderComponent'))

const app = new Vue({
    router,
    store,
    el: '#app'
});


//definir logica globalmente
store.dispatch('loadCategories')


