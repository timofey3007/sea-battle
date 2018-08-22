"use strict";

import Vue from 'vue';
import VueMaterial from 'vue-material';
import lodash from 'lodash';
import store from './store';
import router from './routes';

window._ = lodash;

Vue.use(VueMaterial);

new Vue({
    el: '#app',

    router,

    store,

    components: {
        'app': require('./components/App.vue'),
    }

});