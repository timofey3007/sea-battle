import axios from "axios";
import FilesLoader from "../facades/queue/FilesLoader";

export default {
    loadModule({commit, getters, dispatch}, module) {
        if (typeof module === 'string') {
            module = getters.getModule(module);
        }

        if (typeof module !== "object" || !module.url) {
            commit('appGlobalFail');
        }

        axios.get(module.url)
            .then(response => {
                module.storage = response.data;
                module.loaded = true;

                if (typeof module.callback === 'function') {
                    module.loaded = false;
                    module.callback(dispatch, module);
                }

                commit('moduleUpdate', module);
            })
            .catch(error => commit('appGlobalFail'));
    },

    enableModule({commit, getters}, moduleName) {
        let module = getters.getModule(moduleName);

        module.loaded = true;

        commit('moduleUpdate', module);
    },

    loadContent({commit, getters, dispatch}, module) {
        let files = module.storage;

        if (!Array.isArray(files)) {
            commit('appGlobalFail');
        }

        const fileLoader = new FilesLoader(getters.localDatabase, files);

        fileLoader.runQueue()
            .then(() => {
                dispatch("enableModule", "content");
            })
            .catch(() => commit('appGlobalFail'));
    },

    playMusic({commit}, sound) {
        commit("saveSound", sound);
    },

    startApplication({commit}) {
        commit("toggleApplicationReady", true);
    },
};