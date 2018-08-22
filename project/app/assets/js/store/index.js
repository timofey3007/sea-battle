import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from "./actions";
import mutations from "./mutations";

export default new Vuex.Store({
    state: {
        hasGlobalError: false,
        locale: "en",
        modules: [
            {
                name: 'translations',
                loaded: false,
                storage: null,
            },
            {
                name: 'images',
                loaded: false,
                storage: null,
            },
            {
                name: 'music',
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