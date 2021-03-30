import firebase from "firebase/app";
import "firebase/auth";

class User {
    constructor(id) {
        this.id = id;
    }
}

export default {
    state: {
        user: null,
        loggedIn: false
    },
    getters: {
        getUser({ user }) {
            return user;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async registerUser({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                commit('setLoading', false);
                commit('setUser', new User(user.user.uid));
            }
            catch (error) {
                commit('setLoading', false);
                commit('setError', error);
                throw error;
            }
        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                commit('setLoading', false);
                commit('setUser', new User(user.user.uid));
            }
            catch (error) {
                commit('setLoading', false);
                commit('setError', error);
                throw error;
            }
        },
        autoLoginUser({ commit }, payload) {
            commit('setUser', new User(payload.uid));
        },
        logoutUser({ commit }) {
            firebase.auth().signOut();
            commit('setUser', null);
        }
    }
}