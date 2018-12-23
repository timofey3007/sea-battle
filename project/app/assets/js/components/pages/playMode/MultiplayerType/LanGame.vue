<template>
    <div class="lan-container">
        <transition
            duration="800"
            :name="transitionName"
        >
            <md-content
                    v-if="!isServer"
                    class="lab-container-block"
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
                >{{ _.get(translation, 'buttons.or') }}</div>

                <md-button
                        class="lab-container-button md-raised md-primary"
                        @click="createServer"
                >
                    {{ _.get(translation, 'buttons.createServer') }}
                </md-button>
            </md-content>
        </transition>
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

    computed: {
      ...mapGetters([
        'translation',
        'getPeerServer',
      ]),

      isServer() {
        return this.getPeerServer.getServerStatus();
      },
    },

    created() {
      this.createPeerServer();
    },

    data() {
      return {
        transitionName: '',
        peer: null,
        serverId: '',
        peerServerId: '',
      };
    },

    methods: {
      ...mapActions([
        'createPeerServer',
      ]),

      searchOnTable() {
        return null;
      },

      reloadServerList() {

      },

      createServer() {
        this.transitionName = 'create-lan-server';
        this.getPeerServer.enableServer();
      },
    },
  }
</script>

<style scoped>
    .lan-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    .lab-container-block {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
    }
</style>