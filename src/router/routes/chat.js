import { chat } from '../paths'

export default {
    path: chat,
    name: 'chat',
    component: () => import(/* webpackChunkName: "name" */'../../views/ChatDashboard'),
}