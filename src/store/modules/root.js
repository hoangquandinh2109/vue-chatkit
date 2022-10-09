import { STATE, MUTATIONS, ACTIONS, GETTERS } from './root.d'
import { handleError } from '../../helpers'
import chatkit from '../../chatkit'

const state = {
  [STATE.isLoading]: false,
  [STATE.isSending]: false,
  [STATE.error]: null,
  [STATE.user]: null,
  [STATE.reconnect]: false,
  [STATE.activeRoom]: null,
  [STATE.rooms]: [],
  [STATE.users]: [],
  [STATE.messages]: [],
  [STATE.userTyping]: null,
}

const getters = {
  [GETTERS.hasError]: (state) => (state.error ? true : false),
}

const mutations = {
  [MUTATIONS.setError](st, payload) {
    st[STATE.error] = payload
  },

  [MUTATIONS.setIsLoading](st, payload) {
    st[STATE.isLoading] = payload
  },

  [MUTATIONS.setUser](st, payload) {
    st[STATE.user] = payload
  },

  [MUTATIONS.setReconnect](st, payload) {
    st[STATE.reconnect] = payload
  },

  [MUTATIONS.setActiveRoom](st, payload) {
    st[STATE.activeRoom] = payload
  },

  [MUTATIONS.setRooms](st, payload) {
    st[STATE.rooms] = payload
  },

  [MUTATIONS.setUsers](st, payload) {
    st[STATE.users] = payload
  },

  [MUTATIONS.clearChatRoom](st) {
    st[STATE.users] = []
    st[STATE.messages] = []
  },

  [MUTATIONS.setMessages](st, payload) {
    st[STATE.messages] = payload
  },

  [MUTATIONS.addMessage](st, payload) {
    st[STATE.messages].push(payload)
  },

  [MUTATIONS.setIsSending](st, payload) {
    st[STATE.isSending] = payload
  },

  [MUTATIONS.setUserTyping](st, payload) {
    st[STATE.userTyping] = payload
  },

  [MUTATIONS.reset](st) {
    st[STATE.error] = null
    st[STATE.users] = []
    st[STATE.messages] = []
    st[STATE.rooms] = []
    st[STATE.user] = null
  },
}

const actions = {
  async [ACTIONS.login]({ commit }, payload) {
    try {
      commit(MUTATIONS.setError, '')
      commit(MUTATIONS.setIsLoading, true)

      // Connect user to ChatKit service
      const currentUser = await chatkit.connectUser(payload)

      commit(MUTATIONS.setUser, {
        username: currentUser.username,
        name: currentUser.name,
      })

      commit(MUTATIONS.setReconnect, false)

      // Save list of user's rooms in store
      const userRooms = currentUser.rooms.map(({ id, name }) => ({
        id,
        name,
      }))
      commit(MUTATIONS.setRooms, userRooms)

      // Subscribe user to a room
      const activeRoom = state[STATE.activeRoom] || userRooms[0]
      commit(MUTATIONS.setActiveRoom, {
        id: activeRoom.id,
        name: activeRoom.name,
      })
      await chatkit.subscribeToRoom(activeRoom.id)

      return true
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit(MUTATIONS.setIsLoading, false)
    }
  },

  async [ACTIONS.changeRoom]({ commit }, payload) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(payload)
      commit(MUTATIONS.setActiveRoom, { id, name })
    } catch (error) {
      handleError(commit, error)
    }
  },

  [ACTIONS.sendMessage]({ commit }, payload) {
    try {
      commit(MUTATIONS.setError, '')
      commit(MUTATIONS.setIsSending, true)
      return chatkit.sendMessage(payload)
      // const messageId = await chatkit.sendMessage(payload)
      // return messageId
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit(MUTATIONS.setIsSending, false)
    }
  },

  async [ACTIONS.logout]({ commit }) {
    chatkit.disconnectUser()
    commit(MUTATIONS.reset)
    window.localStorage.clear()
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
