import { login } from '../paths'

export default {
    path: login,
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'../../views/Login'),
}