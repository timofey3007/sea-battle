<template>
    <transition
            :name="transitionName"
            :duration="transitionDuration || 600"
    >
        <router-view
            @routeChangeTransitionName="changeRouteAnimation"
            @routeChangeTransitionDuration="changeRouteDuration"
        />
    </transition>
</template>

<script>
    import {mapGetters} from "vuex";
    import router from "./playMode/routes";

    export default {
        name: "play-mode",

        router,

        mounted() {
           this.$router.push({
               name: 'game-type',
           });
        },

        data() {
            return {
                transitionName: null,
                transitionDuration: 600,
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
            },

            changeRouteDuration(animationDuration) {
                this.transitionDuration = animationDuration;
            },
        },
    }
</script>
