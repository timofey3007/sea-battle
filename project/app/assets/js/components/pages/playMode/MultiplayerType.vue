<template>
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

        <md-button
                :title="_.get(translation, 'buttons.back')"
                class="back-button md-icon-button md-raised"
                @click="_goBack()"
        >
            <md-icon>keyboard_backspace</md-icon>
        </md-button>
    </div>
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

        methods: {
            _goBack() {
                this.$emit('routeTransitionNameChanged', 'slide-left');

                this.$router.push({name: 'game-type'});
            }
        },
    }
</script>

<style scoped>

</style>