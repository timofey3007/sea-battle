<template>
    <router-view/>
</template>

<script>
    import {mapGetters} from "vuex";
    import router from "./playMode/routes";

    export default {
        name: "play-mode",

        router,

        computed: {
            ...mapGetters([
                'translation',
            ]),
        }
    }
</script>

<style scoped>

</style>