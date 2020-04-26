import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import App from './App.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const NotFound = { template: '<p>Page not found</p>' }
const About = { template: '<p>about page</p>' }

const router = new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/404',
            component: NotFound
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")