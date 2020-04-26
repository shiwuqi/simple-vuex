let Vue;

class Store {
    constructor(options = {}) {
        this._vm = new Vue({
            data: {
                $$data: forEachState(options.modules)
            }
        })
        const { commit, dispatch } = this
        const store = this
        this.commit = function boundBindCommit(type, payload) {
            return commit.call(store, type, payload)
        }
        this.dispatch = function boundBindAction(type, payload) {
            return dispatch.call(store, type, payload)
        }
        this._mutations = forEachModule(options.modules, 'mutations')
        this._actions = forEachAction(options.modules, store, 'actions')
    }

    get state() {
        return this._vm._data.$$data
    }

    commit(type, payload) {
        this._mutations[type](this.state, payload)
    }

    dispatch(type, payload) {
        let result = this._actions[type](payload)
        if (!isPromise(result)) {
            return Promise.resolve(result)
        } else {
            return result
        }
    }
}

const install = _vue => {
    Vue = _vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }

        }
    })
}

function forEachState(store) {
    let _state = {}
    Object.keys(store).forEach(item => {
        _state[item] = store[item].state
    })
    return _state
}

function forEachAction(store, data, type) {
    let _state = {};
    Object.keys(store).forEach(item => {
        forEachMutation(store[item][type], (mutation, key) => {
            const fn = function (payload) {
                return mutation.call(store, data, payload)
            }
            _state = {
                ..._state,
                [key]: fn
            }
        })
    })
    return _state
}

function forEachModule(store, type) {
    let _state = {}
    Object.keys(store).forEach(item => {
        forEachMutation(store[item][type], (mutation, key) => {
            const fn = function (state, payload) {
                mutation.call(store, state[item], payload)
            }
            _state = {
                ..._state,
                [key]: fn
            }
        })
    })
    return _state;
}

function forEachMutation(mutations, fn) {
    if (mutations) {
        forEachValue(mutations, fn)
    }
}

function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => {
        fn(obj[key], key)
    })
}

function isPromise(val) {
    return val && typeof val.then === 'function'
}

export default {
    install,
    Store,
}