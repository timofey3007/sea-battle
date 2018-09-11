<template>
    <div class="page-container">
        <app-loading
                v-if="!appIsLoad"
        />

        <router-view
                v-if="appIsLoad"
        />

        <vue-audio
                v-show="false"
                :file="getSoundPath"
                :autoPlay="true"
        />
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import VueAudio from 'vue-audio';

    export default {
        name: 'App',

        mounted() {
            this.$store.dispatch("loadModule", "settings");
        },

        computed: {
            ...mapGetters([
                'appIsLoad',
                'translation',
                'getSoundPath'
            ])
        },

        methods: {
            ...mapActions([])
        },

        components: {
            'app-loading': require('./AppLoading.vue'),
            'vue-audio': VueAudio,
        }
    }
</script>

<style lang="scss" scoped>
    .md-app {
        max-height: 400px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>