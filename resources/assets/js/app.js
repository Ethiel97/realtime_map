import './bootstrap';

window.Vue = require('vue');


// Vue.component('locationMap', require('../components/Map'));

import LocationMap from '../components/Map';

const app = new Vue({
    el: '#app',
    components: {
        LocationMap
    }
});