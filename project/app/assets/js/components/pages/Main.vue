<template>
    <section
            class="full-height full-bg-size md-layout"
            :style="{
            backgroundImage: bgImage && `url('${bgImage}')`,
        }"
    >
        <button
                v-for="button in getMainButtonList"
                :class="[
                'main-menu-button',
                button.class,
                {
                    'selected': button.id === selectedButton
                }
            ]"
                @click="startButtonAction(button)"
        >
            <i :class="[
                    'fi sub-color',
                    button.icon
                ]"
            ></i>
        </button>

        <transition
                v-show="false"
        ></transition>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Main",

        async mounted() {
            // this.playMusic(await this.getFilePathFromDB('start.mp3'));
            this.bgImage = await this.getFilePathFromDB('main_bg.jpg');
        },

        data() {
            return {
                bgImage: null,
                selectedButton: null,
            };
        },

        computed: {
            ...mapGetters([
                'localDatabase',
                'translation',
                'getMainButtonList',
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

            startButtonAction(button) {
                this.selectedButton = button.id;
            }
        }
    }
</script>

<style scoped>

</style>