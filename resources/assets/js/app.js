require('./bootstrap');
window.Vue = require('vue');

import router from './routes/routers'
import store from './vuex/store'

/**
 * Components globais
 */
Vue.component('app-component', require('./components/App'))

const app = new Vue({
    router,
    store,
    el: '#app'
});
