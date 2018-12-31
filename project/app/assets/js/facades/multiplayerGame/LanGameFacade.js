import MultiplayerGame from '../../contracts/MultiplayerGame';
import Peer from 'peerjs';

export default class LanGameFacade extends MultiplayerGame {
  constructor(peer) {
    super();

    if (!(peer instanceof Peer)) {
      throw new Error('argument is not a peerjs implementation.');
    }

    this.peer = peer;
    this.isServer = false;
    this.isBusy = false;
    this.subscribeTypes = {
      error: [],
    };

    this._initServerActions();
  }

  enableServer() {
    this.isServer = true;

    return this;
  }

  disableServer() {
    this.isServer = false;

    return this;
  }

  getServerId() {
    return this.peer.id;
  }

  getServerStatus() {
    return this.isServer;
  }

  connectToServerPeer(serverId) {
    this.peer.connect(serverId);
  }

  getServerId() {
    return this.peer.id;
  }

  _initServerActions() {
    this.peer.on('connection', conn => {

      if (!this.isServer || this.isBusy) {
        return false;
      }


      ;debugger
    });

    this.peer.on('error', error => {
      this.sendErrorsToSubscribers(error);
    });
  }

  createServer(serverName) {
    this.connection.createDataChannel(serverName);

    if (this._hasServer()) {
      this.server = this.connection;

      return;
    }

    return this;
  }

  getAvailableServerList() {
    return [];
  }

  _hasServer() {
    return false;
  }

  subscribeOn(type, action) {
    if (typeof action !== 'function' || !Array.isArray(this.subscribeTypes[type])) {
      return;
    }

    this.subscribeTypes[type].push(action);

    return this;
  }

  sendErrorsToSubscribers(error) {
    this.subscribeTypes.error.forEach(action => action(error));
  }
}