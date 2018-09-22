<template>
    <transition name="fade">
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
                        @click="$router.push({ name: 'multiplayer-type'})"
                >
                    {{ _.get(translation, "buttons.multiplayerGame") }}
                </md-button>
            </div>
        </div>
    </transition>
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

            }
        }
    }
</script>

<style scoped>

</style>