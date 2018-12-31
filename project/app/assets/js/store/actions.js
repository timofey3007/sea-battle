import axios from 'axios';
import FilesLoader from '../facades/queue/FilesLoader';
import Peer from 'peerjs';
import LanGameFacade from '../facades/multiplayerGame/LanGameFacade';
import {
  randomString,
} from '../facades/Helper';

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

  createPeerServer({commit, getters, dispatch}) {
    const peerServer = new Peer(
      randomString(12),
      {
        host: getters.getServerHost,
        path: '/peer-js'
      }
    );
    const peerFacade = new LanGameFacade(peerServer);
    peerFacade.subscribeOn('error', error => {
      dispatch('setServerSearchingStatus', false);
      dispatch('addToShackBar', {
        description: _.get(getters.translation, `text.${error.type}`),
        type: 'error',
      })
    });

    commit('savePeerServer', new LanGameFacade(peerServer));
  },

  addToShackBar({commit}, message) {
    commit('addToShackBar', message);
  },

  removeFirstFromShackBar({commit}) {
    commit('removeFirstFromShackBar');
  },

  setServerSearchingStatus({commit}, status) {
    commit('setServerSearchingStatus', status);
  },
};