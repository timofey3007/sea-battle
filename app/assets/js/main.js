"use strict";

import Vue from 'vue';
import VueMaterial from 'vue-material'

Vue.use(VueMaterial);

new Vue({
    el: '#test',

    components: {
        'test': require('./components/test.vue')
    }

});