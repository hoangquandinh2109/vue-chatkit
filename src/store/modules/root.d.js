export const STATE = {
  isLoading: 'isLoading',
  isSending: 'isSending',
  error: 'error',
  user: 'user',
  reconnect: 'reconnect',
  activeRoom: 'activeRoom',
  rooms: 'rooms',
  users: 'users',
  messages: 'messages',
  userTyping: 'userTyping',
};

export const GETTERS = {
  hasError: 'hasError',
};

export const MUTATIONS = {
  setError: 'setError',
  setIsLoading: 'setIsLoading',
  setUser: 'setUser',
  setReconnect: 'setReconnect',
  setActiveRoom: 'setActiveRoom',
  setRooms: 'setRooms',
  setUsers: 'setUsers',
  clearChatRoom: 'clearChatRoom',
  setMessages: 'setMessages',
  addMessage: 'addMessage',
  setIsSending: 'setIsSending',
  setUserTyping: 'setUserTyping',
  reset: 'reset',
};

export const ACTIONS = {
  login: 'login',
  logout: 'logout',
  changeRoom: 'changeRoom',
  sendMessage: 'sendMessage',
};
