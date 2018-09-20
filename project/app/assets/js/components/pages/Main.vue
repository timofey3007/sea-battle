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
                <md-icon v-if="needToShowModal">clear</md-icon>

                <i v-if="!needToShowModal"
                   :class="[
                       'fi sub-color',
                       button.icon
                   ]"
                ></i>
            </button>

            <div class="bg-shadow"
                 v-show="selectedButton"
            ></div>

            <div :class="[
                     'main-modal',
                     {
                         'show-modal': selectedButton,
                     }
                 ]"
            >
                <div class="modal-content">

                </div>
                <svg class="modal-svg-box"
                     ref="modalSvg"
                     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                     xmlns:svg="http://www.w3.org/2000/svg"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     :viewBox="modalSvg && getViewBoxSize()"
                     version="1.1"
                >
                    <path :class="[
                              'border-path',
                          ]"
                          stroke-width="2"
                          fill="none"
                          :d="drawLine()"/>
                </svg>
            </div>
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

            modalSvg: {
                get() {
                    return this.$refs.modalSvg || null;
                },
                cache: false
            }
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

                this.showModalAction();
                this.selectedButton = button.id;
            },

            showModalAction() {
              // let borderPath = this.modalSvg.querySelector('.border-path');

              document.documentElement.style.setProperty('--svg-width', `${this.modalSvg.clientWidth}px`);
              document.documentElement.style.setProperty('--svg-height', `${this.modalSvg.clientHeight}px`);

              console.log('getProperties', {
                width: document.documentElement.style.getPropertyValue('--svg-width'),
                height: document.documentElement.style.getPropertyValue('--svg-height')
              });
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

            getViewBoxSize() {
                if (!this.modalSvg) {
                    return '0 0 0 0';
                }

                let width = this.modalSvg.clientWidth;
                let height = this.modalSvg.clientHeight;

                return `0 0 ${width} ${height}`;
            },

            drawLine() {
                if (!this.modalSvg) {
                    return '';
                }

                let width = this.modalSvg.clientWidth;
                let height = this.modalSvg.clientHeight;

                return `M${width},0 0,0 0,${height} ${width},${height}z`;
            },
        }
    }
</script>

<style scoped>

</style>