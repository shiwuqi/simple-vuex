import Vue from 'vue';
import Vuex from './Vuex';

Vue.use(Vuex);

const CV = {
    state: {
        cv_state: '初始数据'
    },
    mutations: {
        updateCV(state, data) {
            state.cv_state = data
        }
    },
    actions: {
        queryCV({ state, commit, dispatch }, data) {

        }
    }
}

const COUNT = {
    state: {
        num: 1
    },
    mutations: {
        updateCount(state, data) {
            state.num += data;
        }
    },
    actions: {
        queryCount({ state, commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('updateCount', data)
                    resolve(data);
                }, 0)
            })
        }
    }
}

const store = new Vuex.Store({
    modules: {
        CV,
        COUNT
    }
})

export default store