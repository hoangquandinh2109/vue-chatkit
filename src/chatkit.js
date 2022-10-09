import Pusher from 'pusher-js'
import { users, rooms } from './mock-data'
import { MUTATIONS } from './store/modules/root.d'
import moment from 'moment'
import axios from 'axios'
import store from './store'

const APP_KEY = process.env.VUE_APP_KEY
const APP_CLUSTER = process.env.VUE_APP_CLUSTER
const APP_CHANNEL = process.env.VUE_APP_CHANNEL
const APP_MESSAGE_EVENT = process.env.VUE_APP_MESSAGE_EVENT
const APP_TYPING_EVENT = process.env.VUE_APP_TYPING_EVENT
const APP_PRESENCE_EVENT = process.env.VUE_APP_PRESENCE_EVENT
const API_URL = process.env.VUE_APP_API_URL
const updatePresenceStateMinutes = 5

let activeRoom = null
let pusher = null
let channel = null
let currentUser

async function connectUser(username) {
  clearInterval(window.presenceUpdatingInterval)
  
  currentUser = users.find((user) => user.username === username)
  if (currentUser) {
    pusher = new Pusher(APP_KEY, { cluster: APP_CLUSTER })
    channel = pusher.subscribe(APP_CHANNEL)

    updatePresenceState(true)
    window.presenceUpdatingInterval = setInterval(() => {
      updatePresenceState(true)
    }, 1000 * 60 * updatePresenceStateMinutes)

  }
  return currentUser
}

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.username,
    name: user.name,
    presence: user.presence.state
  }))

  store.commit(MUTATIONS.setUsers, members)
}

async function subscribeToRoom(roomId) {
  store.commit(MUTATIONS.clearChatRoom)
  activeRoom = rooms.find(({ id }) => roomId === id)

  channel.unbind_all()

  // ? onMessage
  channel.bind(APP_MESSAGE_EVENT, message => {
    if (message.roomId === roomId) {
      store.commit(MUTATIONS.addMessage, {
        name: message.sender.name,
        username: message.senderId,
        text: message.text,
        date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
      })
      console.log(store.state.messages)
    }
  })

  // ? onTyping
  channel.bind(APP_TYPING_EVENT, ({ roomId: typingRoomId, username, isTyping }) => {
    if (typingRoomId === roomId && username !== currentUser.username) {
      store.commit(MUTATIONS.setUserTyping, isTyping ? username : null)
    }
  })

  // ? onPresenceChanged
  channel.bind(APP_PRESENCE_EVENT, (data) => {
    const presenceUser =  activeRoom.users.find(
      ({ username }) => username === data.username,
    )
    presenceUser.presence.state = data.presenseState
    setMembers()
  })

  setMembers()
  return activeRoom
}

function sendMessage(text) {
  const { username: senderId, name} = currentUser
  const message = {
    sender: {
      name
    },
    senderId,
    text,
    createdAt: new Date().toISOString(),
    roomId: activeRoom.id,
  }

  // former: return messageId
  return axios.post(`${API_URL}sendmessage`, message)
}

export function isTyping(roomId) {
  const typingPoster = (isTyping) => {
    return axios.post(`${API_URL}typing`, {
      roomId,
      username: currentUser.username,
      isTyping
    })
  }
  
  if (window.typingTimeout) {
    clearTimeout(window.typingTimeout)
  } else {
    typingPoster(true)
  }
  
  window.typingTimeout = setTimeout(() => {
    typingPoster(false)
    window.typingTimeout = 0
  }, 1000)
}

function disconnectUser() {
  updatePresenceState(false)
  pusher.disconnect()
}

function updatePresenceState(value) {
  axios.post(`${API_URL}presence`, {
    username: currentUser.username,
    presenseState: value ? 'online' : 'offline'
  })
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser,
}
