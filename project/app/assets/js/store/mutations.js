export default {
  appGlobalFail(state) {
    state.hasGlobalError = true;
  },

  moduleUpdate(state, module) {
    let moduleIndex = _.findIndex(state.modules, {'name': module.name});

    if (moduleIndex === -1) {
      return;
    }

    state.modules.splice(moduleIndex, 1);

    state.modules = [
      ...state.modules,
      module,
    ];
  },

  loadFilesToQueue(state, files) {
    if (!Array.isArray(files)) {
      return;
    }

    state.queue = [
      ...files
    ];
  },

  saveSound(state, soundPath) {
    state.soundPath = soundPath;
  },

  toggleApplicationReady(state, status) {
    state.readyToStart = status;
  },

  savePeerServer(state, peerServer) {
    state.peerServer = peerServer;
  },

  addToShackBar(state, message) {
    state.snackBarQueue.push(message);
  },

  removeFirstFromShackBar(state) {
    state.snackBarQueue.shift();
  },

  setServerSearchingStatus(state, serverStatus) {
    state.serverIsSearching = serverStatus;
  },
};