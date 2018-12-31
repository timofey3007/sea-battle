import FileStorage from "../facades/FileStorage";
import {
  BASE_URL,
} from '../config';

const contentStorage = new FileStorage('file-content');

export default {
  appIsLoad: ({modules}) => {
    return modules
      .filter(module => !module.loaded)
      .length === 0;
  },

  readyToStart: ({readyToStart}) => {
    return readyToStart;
  },

  translation: state => {
    let translations = _.find(state.modules, {name: 'translations'}).storage;

    if (_.isObject(translations)) {
      return translations[state.locale];
    }

    return null;
  },

  getMainButtonList: state => {
    return state.mainButtonList;
  },

  getModule: ({modules}) => moduleName => {
    return _.find(modules, {'name': moduleName});
  },

  localDatabase() {
    return contentStorage;
  },

  getSoundPath({soundPath}) {
    return soundPath;
  },

  peerServer({peerServer}) {
    return peerServer;
  },

  snackBarMessages({snackBarQueue}) {
    return snackBarQueue;
  },

  serverIsSearching({serverIsSearching}) {
    return serverIsSearching;
  },

  getServerHost() {
    const {1: host} = BASE_URL.split('//');

    return host;
  }
};