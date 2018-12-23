<template>
    <div class="full-layout">
        <md-app class="md-layout">
            <md-app-toolbar class="md-primary">
                <span class="md-title">
                    {{ getTitle() }}
                </span>
            </md-app-toolbar>

            <md-app-drawer
                    md-permanent="full"
                    class="drawler-block"
            >
                <md-toolbar class="md-transparent" md-elevation="0"></md-toolbar>

                <md-list>
                    <md-list-item
                            :disabled="true"
                            :selected="routeIsSelected('online')"
                            @click="goToModal('online')"
                    >
                        <md-icon
                                :disabled="true"
                        >language
                        </md-icon>
                        <span class="md-list-item-text">
                            {{ _.get(translation, "buttons.onlineGame") }}
                        </span>
                    </md-list-item>

                    <md-list-item
                            :class="{
                            'selected-bg': routeIsSelected('lan')
                        }"
                            @click="goToModal('lan')"
                    >
                        <md-icon>wifi</md-icon>
                        <span class="md-list-item-text">
                            {{ _.get(translation, "buttons.lanGame") }}
                        </span>
                    </md-list-item>
                </md-list>

                <md-button
                        :title="_.get(translation, 'buttons.back')"
                        class="back-button md-icon-button md-primary md-raised"
                        @click="goBack()"
                >
                    <md-icon>keyboard_backspace</md-icon>
                </md-button>
            </md-app-drawer>

            <md-app-content class="multiplayer-container">
                <div :is="gameContentComponent"></div>

                <p v-if="!selectedRoute">
                    {{ _.get(translation, 'text.emptyMultiplayerType') }}
                </p>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "multiplayer-game",

    computed: {
      ...mapGetters([
        'translation',
      ]),

      selectedRoute() {
        return _.get(this.$route, 'params.type', '');
      },
    },

    data() {
      return {
        gameFacade: null,
        gameContentComponent: null,
      };
    },

    methods: {
      routeIsSelected(route) {
        return route === this.selectedRoute;
      },

      getTitle() {
        return _.get(
          this.translation,
          `titles.${this.selectedRoute}Game`,
          _.get(this.translation, 'titles.multiplayerGame')
        );
      },

      goBack() {
        this.$emit('routeChangeTransitionName', 'multiplayer-to-game-type');
        this.$emit('routeChangeTransitionDuration', 800);

        this.$router.push({name: 'game-type'});
      },

      goToModal(type) {
        if (this.routeIsSelected(type)) {
          return;
        }

        this.$emit('routeChangeTransitionDuration', 0);

        this.$router.push({
          name: 'multiplayer-game',
          params: {
            type,
          },
        });
      },

      _syncGameFacade(route) {
        switch (route) {
          case 'lan':
            this.gameContentComponent = 'lanGame';
            break;
          default:
            this.gameContentComponent = null;
            return null;
        }
      }
    },

    watch: {
      selectedRoute(route, prevRoute) {
        if (route && route !== prevRoute) {
          this._syncGameFacade(route);
        }
      }
    },

    components: {
      lanGame: require('./MultiplayerType/LanGame'),
      onlineGame: require('./MultiplayerType/OnlineGame'),
    }
  }
</script>

<style scoped>
    .drawler-block {
        width: 200px;
    }

    .multiplayer-container {
        display: flex;
    }
</style>