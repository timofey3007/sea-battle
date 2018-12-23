import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

import {
  APP_LANG_URL,
  APP_STORAGE_URL,
  APP_CONFIG_URL,
} from "./global";

export default new Vuex.Store({
  state: {
    hasGlobalError: false,
    locale: "en",
    modules: [
      {
        name: 'settings',
        url: APP_CONFIG_URL,
        loaded: false,
        storage: null,
        callback: dispatch => {
          dispatch("loadModule", "translations");
          dispatch("loadModule", "content");
          dispatch("enableModule", "settings");
        },
      },
      {
        name: 'translations',
        url: APP_LANG_URL,
        loaded: false,
        storage: null,
      },
      {
        name: 'content',
        url: APP_STORAGE_URL,
        loaded: false,
        storage: null,
        callback: (dispatch, module) => {
          dispatch("loadContent", module);
        },
      },
    ],
    mainButtonList: [
      {
        id: 'start',
        icon: 'flaticon-boat',
        class: 'big-menu-button position-start',
        component: "playMode",
        position: {
          left: "50%",
          top: "50%",
        },
      },
      {
        id: 'settings',
        icon: 'flaticon-adventure-1',
        class: 'position-settings',
        component: "settings",
        position: {
          left: "80%",
          top: "60%",
        },
      },
    ],
    readyToStart: false,
    soundPath: null,
    peerServer: null,
  },

  getters,

  actions,

  mutations
});