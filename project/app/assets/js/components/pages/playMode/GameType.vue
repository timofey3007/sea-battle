<template>
    <div class="full-layout flex-vertical layout-center">
        <div>
            <md-button
                    class="md-raised md-primary"
                    disabled
            >
                {{ _.get(translation, "buttons.singleGame") }}
            </md-button>
        </div>

        <div>
            <md-button
                class="md-raised md-primary"
                @click="goToMultiplayer()"
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

            goToSingle() {
                this.$emit('routeChangeTransitionName', 'game-type');
                this.$emit('routeChangeTransitionDuration', 600);

                this.$router.push({name: 'single'});
            },

            goToMultiplayer() {
                this.$emit('routeChangeTransitionName', 'game-type-to-multiplayer');
                this.$emit('routeChangeTransitionDuration', 800);

                this.$router.push({
                    name: 'multiplayer-game',
                });
            },
        }
    }
</script>

<style scoped>

</style>