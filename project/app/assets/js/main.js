"use strict";

import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import _ from 'lodash';

import {mapGetters} from 'vuex';

Vue.use(Vuex);
Vue.use(VueMaterial);

window._ = _;

const store = require('./store');

new Vue({
    el: '#app',

    store,

    computed: {
        ...mapGetters([
            'isLoad',
            'translation'
        ])
    },

    components: {
        'app': require('./components/App.vue'),
        'app-loading': require('./components/AppLoading.vue'),
    }

});