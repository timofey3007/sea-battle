<template>
    <div class="md-layout flex-vertical md-alignment-center">
        <div class="md-layout-item md-medium-size-100">
            <md-button
                    class="md-raised md-primary"
                    disabled
            >
                {{ _.get(translation, "buttons.singleGame") }}
            </md-button>
        </div>
        <div class="md-layout-item md-medium-size-100">
            <md-button
                    class="md-raised md-primary"
                    @click="_goNext('multiplayer-type')"
            >
                {{ _.get(translation, "buttons.multiplayerGame") }}
            </md-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "game-type",

        computed: {
            ...mapGetters([
                'translation',
            ]),
        },

        methods: {
            showAction() {

            },

            _goNext(routeName) {
                this.$emit('routeTransitionNameChanged', 'slide-right');

                this.$router.push({name: routeName});
            }
        }
    }
</script>

<style scoped>

</style>