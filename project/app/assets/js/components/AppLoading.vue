<template>
    <div class="page-container full-height md-layout md-alignment-center-center">
        <loading
                v-show="!appIsLoad"
                :title="getLoadingTitle()"
        />

        <md-button class="md-raised md-primary"
                   v-show="appIsLoad"
                   @click="startApplication"

        >
            {{ _.get(translation, 'buttons.readyToStart') }}
        </md-button>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'AppLoading',

        data() {
            return {
                lang: this.translation || '',
            };
        },

        computed: {
            ...mapGetters([
                'translation',
                'appIsLoad',
            ])
        },

        methods: {
            getLoadingTitle() {
                return _.get(this.translation, 'loading') || 'Loading';
            },

            ...mapActions([
                "startApplication",
            ]),

        },

        components: {
            loading: require("./loaders/StringsLoader.vue"),
        }
    }
</script>