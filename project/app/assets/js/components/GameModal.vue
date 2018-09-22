<template>
    <div>
        <div class="bg-shadow"
             v-show="showModal"
        ></div>

        <div :class="[
                 'main-modal',
                 {
                     'show-modal': showModal
                 },
             ]"
        >
            <div class="modal-content">
                <component
                        :is="componentView"
                ></component>
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
                      :d="drawLine()"
                />
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: "game-modal",

        props: {
            componentView: {
                validator: prop => typeof prop === 'string' || prop === null,
                required: true,
                default: "playMode",
            },
            classes: {
                type: [String, Array, Object],
            },
            showModal: {
                type: [Boolean],
                default: false,
            },
        },

        mounted() {
            document.documentElement.style.setProperty('--svg-width', `${this.modalSvg.clientWidth}px`);
            document.documentElement.style.setProperty('--svg-height', `${this.modalSvg.clientHeight}px`);
        },

        computed: {
            modalSvg: {
                get() {
                    return this.$refs.modalSvg || null;
                },
                cache: false
            },
        },

        methods: {
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

                return `M0,${height} ${width},${height} ${width},0 0,0z`;
            },
        },

        components: {
            playMode: require("./pages/PlayMode.vue"),
            settings: require("./pages/Settings.vue"),
        },
    }
</script>

<style scoped>

</style>