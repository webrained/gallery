import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        images: []
    },
    mutations: {
        ADD_IMAGE(state, data) {
            state.images.push(data);
        },
        REMOVE_IMAGE(state, data) {
            state.images.splice(data, 1);
        }
    },
    plugins: [createPersistedState()]
})
