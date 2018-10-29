//esse bootstrap não tem nada a ver com o framework css bootstrap
require('./bootstrap');

window.Vue = require('vue');

/**
 * Componentes globais que podem ser usados
 * em qualquer lugar
 */

 Vue.component('test-component', require('./components/TestComponent.vue'))

const app = new Vue({
    el: '#app'
});
