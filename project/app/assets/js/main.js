"use strict";

import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueClipboard from 'vue-clipboard2'
import lodash from 'lodash';
import i18n from './i18n';
import store from './store';
import router from './routes';

VueClipboard.config.autoSetContainer = true;
Vue.prototype._ = lodash;

Vue.use(VueMaterial);
Vue.use(VueClipboard);

new Vue({
  el: '#app',

  i18n,

  router,

  store,

  components: {
    'app': require('./components/App.vue'),
  }

});