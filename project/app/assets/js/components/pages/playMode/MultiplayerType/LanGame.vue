<template>
    <div>
        <md-table
            v-model="serverList"
            md-sort="name"
            md-sort-order="asc"
            md-card
            md-fixed-header
        >
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">
                        {{ _.get(translation, 'titles.serverList') }}
                    </h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    :md-label="_.get(translation, 'text.emptyServerList')"
                    md-description="">
                <md-button
                    class="md-primary md-raised"
                    @click="reloadServerList"
                >
                    {{ _.get(translation, 'buttons.reload') }}
                </md-button>
            </md-table-empty-state>

            <md-table-row
                slot="md-table-row"
                slot-scope="{ server }"
            >
                <md-table-cell
                    :md-label="_.get(translation, 'titles.serverName')"
                    md-sort-by="name"
                >{{ server.name }}</md-table-cell>
                <md-table-cell
                    :md-label="_.get(translation, 'titles.serverUser')"
                    md-sort-by="title"
                ></md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "LanGame",

        props: {
            serverList: {
                type: Array,
                default: () => ([]),
            },
        },

        computed: {
            ...mapGetters([
                'translation',
            ]),
        },

        data() {
            return {
                search: '',
            };
        },

        methods: {
            searchOnTable() {
                return null;
            },

            reloadServerList() {

            },

            createServer() {

            },
        },
    }
</script>

<style scoped>

</style>