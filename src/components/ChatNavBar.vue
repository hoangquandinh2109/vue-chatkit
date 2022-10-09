<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Vue Chat
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.name }} | </b-nav-text>
      <b-nav-item href="#" @click="onLogout" active>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { STATE, ACTIONS, MUTATIONS } from '@/store/modules/root.d'
import { login } from '@/router/paths'

export default {
  name: 'ChatNavBar',

  computed: {
    ...mapState([STATE.user, STATE.reconnect]),
  },

  mounted() {
    window.addEventListener('beforeunload', this.unload)
    if (this.reconnect) {
      this.login(this.user.username)
    }
  },

  methods: {
    ...mapActions([ACTIONS.login, ACTIONS.logout]),

    ...mapMutations([MUTATIONS.setReconnect]),

    onLogout() {
      this.$router.push(login)
      this.logout()
    },

    unload() {
      if (this.user.username) {
        // User hasn't logged out
        this.setReconnect(true)
      }
    },
  },
}
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>
