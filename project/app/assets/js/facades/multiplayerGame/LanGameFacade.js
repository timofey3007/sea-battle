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

    this._initServerActions();

    // TODO Need to be refactored
    this.connection = null;
    this.localIp = null;
    this.server = null;
    this.ipRegExp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

    const RTCPeerConnection = window.RTCPeerConnection
      || window.mozRTCPeerConnection
      || window.webkitRTCPeerConnection;
    const noop = () => {
    };

    this.connection = new RTCPeerConnection({
      iceServers: []
    });

    this.connection.createDataChannel('');
    this.connection.createOffer(
      this.connection.setLocalDescription.bind(this.connection),
      noop
    );
    this.connection.onicecandidate = ice => {
      const candidateRow = _.get(ice, 'candidate.candidate', '');
      const localExec = this.ipRegExp.exec(candidateRow);

      if (_.has(localExec, '1')) {
        this.localIp = localExec[1];
      }
    };
  }

  enableServer() {
    this.isServer = true;

    return this;
  }

  disableServer() {
    this.isServer = false;

    return this;
  }

  getServerStatus() {
    return this.isServer;
  }

  connectToServerPeer(serverId) {
    this.peer.connect(serverId);
  }

  getServerId() {

  }

  _initServerActions() {
    this.peer.on('connection', conn => {
      if (!this.isServer || this.isBusy) {
        return false;
      }


      ;debugger
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

  getLocalIp() {
    return this.localIp;
  }

  getAvailableServerList() {
    return [];
  }

  _hasServer() {
    return false;
  }
}