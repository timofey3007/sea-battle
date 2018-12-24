<template>
    <div class="md-layout">
        <transition-group
                class="lan-container md-layout"
                duration="800"
                name="lan-server"
        >
            <md-content
                    key="main-block"
                    v-if="!isServer"
                    class="lan-base-container-block md-layout-item md-medium-size-50"
            >
                <md-field class="lab-container-server-input">
                    <label>{{ _.get(translation, 'buttons.serverId') }}</label>
                    <md-input
                            v-model="peerServerId"
                            maxlength="12"
                    />
                </md-field>

                <div
                        class="lab-container-divider"
                >{{ _.get(translation, 'buttons.or') }}
                </div>

                <md-button
                        class="lab-container-button md-raised md-primary"
                        @click="createServer"
                >
                    {{ _.get(translation, 'buttons.createServer') }}
                </md-button>
            </md-content>

            <md-content
                    key="server-block"
                    class="lan-create-server-block"
                    v-if="isServer"
            >
                <md-card class="lan-server-id-block">
                    <md-card-header>
                        <div class="md-title">
                            <span>{{ peerServer.getServerId() }}</span>
                            <span @click="copyServerId">
                                <md-icon class="copy-button">file_copy</md-icon>
                                <md-tooltip
                                        md-direction="top"
                                        :md-active.sync="serverIdCopied"
                                >{{ _.get(translation, 'titles.copied') }}</md-tooltip>
                            </span>
                        </div>
                        <div class="md-subhead">{{ _.get(translation, 'titles.lanServerId') }}</div>
                    </md-card-header>
                </md-card>

                <md-button
                        :title="_.get(translation, 'titles.lanServerShutDown')"
                        class="lan-server-shut-down md-icon-button md-raised md-primary"
                        @click="shutDownServer"
                >
                    <md-icon>power</md-icon>
                </md-button>
            </md-content>
        </transition-group>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: "LanGame",

    props: {
      serverList: {
        type: Array,
        default: () => ([]),
      },
    },

    created() {
      this.createPeerServer();
    },

    computed: {
      ...mapGetters([
        'translation',
        'peerServer',
      ]),

      isServer() {
        return this.peerServer.getServerStatus();
      },
    },

    data() {
      return {
        transitionName: '',
        peer: null,
        serverIdCopied: false,
        peerServerId: '',
      };
    },

    methods: {
      ...mapActions([
        'createPeerServer',
      ]),

      createServer() {
        this.peerServer.enableServer();
      },

      shutDownServer() {
        this.peerServer.disableServer();
      },

      copyServerId() {
        this.$copyText(this.peerServer.getServerId())
          .then(() => {
            this.serverIdCopied = true;

            setTimeout(() => this.serverIdCopied = false, 2000);
          });
      },
    },
  }
</script>

<style scoped>
    .lan-container {
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .lan-base-container-block {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
    }

    .lan-create-server-block {
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
    }

    .lan-server-shut-down {
        margin-top: 5px;
    }

    .copy-button {
        cursor: pointer;
    }
</style>