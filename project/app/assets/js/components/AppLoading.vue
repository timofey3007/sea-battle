<template>
    <div class="page-container">
        <loading
                :title="getLoadingTitle()"
        />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'AppLoading',

        data() {
            return {
                lang: this.translation || '',
            };
        },

        computed: {
            ...mapGetters([
                'translation'
            ])
        },

        methods: {
            getLoadingTitle() {
                return _.get(this.translation, 'loading') || 'Loading';
            }
        },

        components: {
            loading: require("./loaders/StringsLoader.vue"),
        }
    }
</script>