import MultiplayerGame from '../../contracts/MultiplayerGame';

class LanGameFacade extends MultiplayerGame {
    connection;
    server;
    ipRegExp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

    constructor() {
        super();

        const RTCPeerConnection = window.RTCPeerConnection
            || window.mozRTCPeerConnection
            || window.webkitRTCPeerConnection;

        this.connection = new RTCPeerConnection({
            iceServers: []
        });
    }

    createServer() {
        this.connection.createDataChannel('');

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

    }
}