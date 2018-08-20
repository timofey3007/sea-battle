"use strict";

import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';

Vue.use(Vuex);
Vue.use(VueMaterial);

const store = require('./store');
console.log(process);
new Vue({
    el: '#test',

    components: {
        'test': require('./components/test.vue')
    }

});