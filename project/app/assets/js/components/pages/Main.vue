<template>
    <section
            class="full-height full-bg-size md-layout"
            :style="{
            backgroundImage: bgImage && `url('${bgImage}')`,
        }"
    >
        <md-icon class="fi flaticon-boat"></md-icon>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Main",

        async mounted() {
            this.playMusic(await this.getFilePathFromDB('start.mp3'));
            this.bgImage = await this.getFilePathFromDB('main_bg.jpg');
        },

        data() {
            return {
                bgImage: null
            };
        },

        computed: {
            ...mapGetters([
                'localDatabase',
                'translation',
            ])
        },

        methods: {
            ...mapActions([
                'playMusic'
            ]),

            async getFilePathFromDB(fileName) {
                return this.localDatabase.getUrlFromBlob(
                    await this.localDatabase.getBlobFile(fileName)
                );
            },
        }
    }
</script>

<style scoped>

</style>