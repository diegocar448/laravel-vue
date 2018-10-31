//esse bootstrap não tem nada a ver com o framework css bootstrap
require('./bootstrap');
window.Vue = require('vue');

import router from './routes/routers'
import store from './vuex/store'

/**
 * Componentes globais que podem ser usados
 * em qualquer lugar
 */
Vue.component('app-component', require('./components/App'))
 

const app = new Vue({       
    router,
    store,
    el: '#app'
});
