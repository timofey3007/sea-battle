import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from "./actions";
import mutations from "./mutations";

import {
    APP_LANG_URL,
} from "./global";

export default new Vuex.Store({
    state: {
        hasGlobalError: false,
        locale: "en",
        modules: [
            {
                name: 'translations',
                url: APP_LANG_URL,
                loaded: false,
                storage: null,
            },
            {
                name: 'images',
                url: null,
                loaded: false,
                storage: null,
            },
            {
                name: 'music',
                url: null,
                loaded: false,
                storage: null,
            },
        ]
    },

    getters: {
        appIsLoad: ({modules}) => {
            return modules
                .filter(module => !module.loaded)
                .length === 0;
        },

        translation: state => {
            let translations = _.find(state.modules, {});

            if (_.isObject(translations)) {
                return translations[state.locale];
            }

            return null;
        }
    },

    actions,

    mutations
});