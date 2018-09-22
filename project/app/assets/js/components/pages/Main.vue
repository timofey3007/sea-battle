<template>
    <section
            class="full-height full-bg-size md-layout"
            :style="{
            backgroundImage: bgImage && `url('${bgImage}')`,
        }"
    >
        <div :class="[
                {
                    'show-modal-on-main': needToShowModal,
                    'hide-modal-on-main': needToHideModal,
                }
            ]"

        >
            <button
                    v-for="button in getMainButtonList"
                    :class="[
                        'main-menu-button',
                        button.class,
                        {
                            'selected': buttonIsSelected(button)
                        }
                    ]"
                    :style="button.position"
                    @click="toggleButtonAction(button)"
                    :key="`button-${button.id}`"
            >
                <md-icon class="clear-button">clear</md-icon>

                <i :class="[
                       'icon-button',
                       'fi sub-color',
                       button.icon
                   ]"
                ></i>
            </button>

            <game-modal
                    :componentView="modalComponent"
                    :showModal="needToShowModal"
            />
        </div>
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
                modalComponent: null,
                selectedButton: null,
                needToShowModal: false,
                needToHideModal: false,
            };
        },

        computed: {
            ...mapGetters([
                'localDatabase',
                'translation',
                'getMainButtonList',
            ]),
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

            toggleButtonAction(button) {
                if (this.buttonIsSelected(button)) {
                    this.hideModalAction();

                    return;
                }


                this.selectedButton = button.id;
                this.modalComponent = button.component;
                this.showModalAction();
            },

            showModalAction() {
                // let borderPath = this.modalSvg.querySelector('.border-path');


                this.needToShowModal = true;
                this.needToHideModal = false;
            },

            hideModalAction() {
                this.needToShowModal = false;
                this.needToHideModal = true;

                setTimeout(() => {
                    this.selectedButton = false;
                }, 1000);
            },

            buttonIsSelected(button) {
                return this.selectedButton === button.id;
            },
        },

        components: {
            gameModal: require("../GameModal.vue"),
        },
    }
</script>

<style scoped>

</style>