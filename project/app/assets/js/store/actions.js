import axios from "axios";

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

        commit("loadFilesToQueue", files);

        dispatch("_loadFilesRecursive", getters.getQueueCount);
    },

    _loadFilesRecursive({commit, getters, dispatch}, fullFilesCount) {
        if (getters.getQueueCount === 0) {
            dispatch.enableModule("content");
        }

        let filePath = getters.getQueueItem;

        if (typeof filePath !== "string") {
            return;
        }

        axios({
            method: 'GET',
            url: filePath,
            responseType: 'blob',
        })
            .then(response => {
                let file = response.data;

                console.log('file', file);
            });
    }
};