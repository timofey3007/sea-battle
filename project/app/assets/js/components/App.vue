<template>
    <div class="page-container">
        <app-loading
                v-if="!appIsLoad"
        />

        <router-view
                v-if="appIsLoad"
        />
    </div>
</template>

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

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'App',

        computed: {
            ...mapGetters([
                'appIsLoad',
                'translation'
            ])
        },

        components: {
            'app-loading': require('./AppLoading.vue'),
        }
    }
</script>