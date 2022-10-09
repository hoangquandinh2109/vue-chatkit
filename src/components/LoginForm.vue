<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr>
    <b-form @submit.prevent="onSubmit">
       <b-alert variant="danger" :show="hasError">{{ error }} </b-alert>

      <b-form-group id="userInputGroup"
                    label="User Name"
                    label-for="userInput">
        <b-form-input id="userInput"
                      type="text"
                      placeholder="Enter user name"
                      v-model="userId"
                      autocomplete="off"
                      :disabled="isLoading"
                      required>
        </b-form-input>
      </b-form-group>

      <b-button type="submit"
                variant="primary"
                class="ld-ext-right"
                v-bind:class="{ running: isLoading }"
                :disabled="isValid">
                Login <div class="ld ld-ring ld-spin"></div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions} from 'vuex'
import { STATE, GETTERS, ACTIONS } from '@/store/modules/root.d.js'
import { chat } from '@/router/paths'

export default {
  name: 'login-form',

  data() {
    return {
      userId: '',
    }
  },

  computed: {
    isValid: function() {
      const result = this.userId.length < 3
      return result ? result : this.isLoading
    },

    ...mapState([
      STATE.isLoading,
      STATE.error,
    ]),

    ...mapGetters([
      GETTERS.hasError,
    ]),
  },

  methods: {
    ...mapActions([
      ACTIONS.login
    ]),

    async onSubmit() {
      const result = await this.login(this.userId)
      if (result) {
        this.$router.push(chat)
      }
    },
  },
}
</script>
