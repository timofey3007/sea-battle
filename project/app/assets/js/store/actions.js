import axios from "axios";

import {
    APP_CONFIG_URL
} from "./global";

export default {
    loadAppContent({commit}) {
        axios.get(APP_CONFIG_URL)
            .then(response => {

            })
            .catch(error => commit('appGlobalFail'));
    }
};