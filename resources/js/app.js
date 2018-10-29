//esse bootstrap não tem nada a ver com o framework css bootstrap
require('./bootstrap');

window.Vue = require('vue');

import router from './routes/routers'

/**
 * Componentes globais que podem ser usados
 * em qualquer lugar
 */
 Vue.component('test-component', require('./components/TestComponent'))

const app = new Vue({
    router,
    el: '#app'
});
