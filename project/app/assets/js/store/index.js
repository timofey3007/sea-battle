import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from "./actions";
import mutations from "./mutations";
import FileStorage from "../facades/FileStorage";

import {
    APP_LANG_URL,
    APP_STORAGE_URL,
    APP_CONFIG_URL,
} from "./global";

const contentStorage = new FileStorage('file-content');

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
        queue: [],
        soundPath: null,
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
        },

        getModule: ({modules}) => moduleName => {
            return _.find(modules, {'name': moduleName});
        },

        getQueueItem: ({queue}) => {
            if (!Array.isArray(queue)) {
                return null;
            }

            return queue.shift();
        },

        getQueueCount: ({queue}) => {
            if (!Array.isArray(queue)) {
                return 0;
            }

            return queue.length;
        },

        localDatabase() {
            return contentStorage;
        },

        getSoundPath({soundPath}) {
            return soundPath;
        }
    },

    actions,

    mutations
});