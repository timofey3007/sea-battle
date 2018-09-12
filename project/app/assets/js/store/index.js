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
        readyToStart: false,
        soundPath: null,
    },

    getters,

    actions,

    mutations
});