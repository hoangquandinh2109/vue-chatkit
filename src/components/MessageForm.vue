<template>
  <div class="message-form ld-over">
    <small class="text-muted">@{{ user.username }}</small>
    <b-form @submit.prevent="onSubmit" class="ld-over" v-bind:class="{ running: isSending }">
      <div class="ld ld-ring ld-spin"></div>
      <b-alert variant="danger" :show="hasError">{{ error }} </b-alert>
      <b-form-group>
        <b-form-input id="message-input"
                      type="text"
                      v-model="message"
                      @input="isTyping"
                      placeholder="Enter Message"
                      autocomplete="off"
                      required>
        </b-form-input>
      </b-form-group>
      <div class="clearfix">
        <b-button type="submit" variant="primary" class="float-right">
          Send
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { STATE, GETTERS, ACTIONS } from '@/store/modules/root.d.js'
import { isTyping } from '@/chatkit.js'

export default {
  name: 'message-form',

  data() {
    return {
      message: ''
    }
  },

  computed: {
    ...mapState([
      STATE.user,
      STATE.isSending,
      STATE.error,
      STATE.activeRoom,
    ]),
    
    ...mapGetters([
      GETTERS.hasError,
    ]),
  },

  methods: {
    ...mapActions([
      ACTIONS.sendMessage
    ]),

     onSubmit() {
      this.sendMessage(this.message).then(() => {
        this.message = ''
      })
    },

    async isTyping() {
      await isTyping(this.activeRoom.id)
    },
  },
}
</script>
