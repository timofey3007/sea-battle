import axios from "axios";

export default {
    loadAppContent({state, commit, dispatch}) {
        state.modules.forEach(module => {
            dispatch('loadModule', module);
        });
    },

    loadModule({commit}, module) {
        if (typeof module !== "object" || !module.url) {
            return;
        }

        axios.get(module.url)
            .then(response => {
                module.storage = response;
                module.loaded = true;

                commit('moduleUpdate', module);
            })
            .catch(error => commit('appGlobalFail'));
    }
};