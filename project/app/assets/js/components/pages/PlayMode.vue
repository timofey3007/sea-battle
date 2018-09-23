<template>
    <transition
            :name="transitionName"
            :duration="{
                enter: '600ms',
                leave: '600ms',
            }"
    >
        <router-view
                @routeTransitionNameChanged="changeRouteAnimation"
        />
    </transition>
</template>

<script>
    import {mapGetters} from "vuex";
    import router from "./playMode/routes";

    export default {
        name: "play-mode",

        router,

        data() {
            return {
                transitionName: 'fade'
            };
        },

        computed: {
            ...mapGetters([
                'translation',
            ]),
        },

        methods: {
            changeRouteAnimation(animationName) {
                this.transitionName = animationName;
            }
        },
    }
</script>

<style scoped>

</style>