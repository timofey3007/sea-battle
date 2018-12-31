<template>
    <md-snackbar
            class="md-primary"
            :md-position="_.get(message, 'position', defaultPosition)"
            :md-duration="_.get(message, 'duration', defaultDuration)"
            :md-active.sync="hasMessage"
            md-persistent
            @md-closed="removeFirstFromShackBar"
    >
        <span v-html="_.get(message, 'description', '')"></span>
        <md-button
                class="md-icon-button md-raised md-primary"
                @click="hideShackBar"
        >
            <md-icon>close</md-icon>
        </md-button>
    </md-snackbar>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";

  /**
   * message structure
   * {
   *     duration: [Number|null],
   *     position: [String|null],
   *     description: [String|html],
   * }
   */
  export default {
    name: "SnackBar",

    data() {
      return {
        defaultPosition: 'center',
        defaultDuration: 3000,
        message: null,
        hasMessage: false,
      };
    },

    computed: {
      ...mapGetters([
        'translation',
        'snackBarMessages',
      ]),
    },

    methods: {
      ...mapActions([
        'removeFirstFromShackBar',
      ]),

      showFirstMessage() {
        this.message = _.first(this.snackBarMessages);
        this.hasMessage = true;
      },

      hideShackBar() {
        this.hasMessage = false;
      },
    },

    watch: {
      snackBarMessages() {
        if (this.snackBarMessages.length > 0) {
            this.showFirstMessage();
        }
      },
    },
  }
</script>