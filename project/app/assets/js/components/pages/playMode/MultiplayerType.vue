<template>
    <transition name="slide">
        <div class="md-layout flex-vertical md-alignment-center">
            <div class="md-layout-item md-medium-size-100">
                <md-button
                        class="md-raised md-primary"
                        disabled
                >
                    {{ _.get(translation, "buttons.onlineGame") }}
                </md-button>
            </div>
            <div class="md-layout-item md-medium-size-100">
                <md-button
                        class="md-raised md-primary"
                >
                    {{ _.get(translation, "buttons.lanGame") }}
                </md-button>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "multiplayer-type",

        computed: {
            ...mapGetters([
                'translation',
            ]),
        },
    }
</script>

<style scoped>

</style>