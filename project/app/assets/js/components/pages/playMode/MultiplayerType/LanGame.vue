<template>
    <div class="lan-container">
        <md-content class="lab-container-block">
            <md-field>
                <label>{{ _.get(translation, 'buttons.serverId') }}</label>
                <md-input
                        v-model="peerServerId"
                        maxlength="12"
                />
            </md-field>

            <div>{{ _.get(translation, 'buttons.or') }}</div>

            <md-button
                    class="md-raised md-primary"
                    @click="createServer"
            >{{ _.get(translation, 'buttons.createServer') }}
            </md-button>
        </md-content>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Peer from 'peerjs';
  import {randomString} from '../../../../facades/Helper';

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
      ]),
    },

    data() {
      return {
        search: '',
        serverId: '',
        peerServerId: '',
      };
    },

    methods: {
      searchOnTable() {
        return null;
      },

      reloadServerList() {

      },

      createServer() {
        const env = process.env;
        // TODO Port and path need to be replaced to env variables
        const peer = new Peer(
          randomString(12),
          {
            host: 'localhost',
            port: 9500,
            path: '/peer-js'
          }
        );
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