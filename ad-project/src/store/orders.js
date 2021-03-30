import firebase from 'firebase/app'
import "firebase/database"

class Order {
    constructor(name, phone, adId, done = false, id = null) {
        this.name = name;
        this.phone = phone;
        this.adId = adId;
        this.done = done;
        this.id = id;
    }
}

export default {
    state: {
        orders: []
    },
    getters: {
        getDoneOrders({ orders }) {
            return orders.filter((order) => order.done);
        },
        getUndoneOrders({ orders }) {
            return orders.filter((order) => !order.done);
        },
        getOrders({ orders }) {
            return orders;
        }
    },
    mutations: {
        loadOrders(state, payload) {
            state.orders = payload;
        }
    },
    actions: {
        async createOrder({ commit }, { name, phone, adId, ownerId }) {
            const order = new Order(name, phone, adId);

            commit('clearError');
            commit('setLoading', true);
            try {
                await firebase.database().ref(`/users/${ownerId}/orders`).push(order);
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error;
            }
        },
        async fetchOrders({ commit, getters }) {

            commit('clearError');
            commit('setLoading', true);

            const resultOrders = [];

            try {
                const fbVal = await firebase.database().ref(`/users/${getters.getUser.id}/orders`).once('value');
                const orders = fbVal.val();

                Object.keys(orders).forEach((key) => {
                    const order = orders[key];

                    resultOrders.push(
                        new Order(order.name, order.phone, order.adId, order.done, key)
                    )
                })

                commit('loadOrders', resultOrders);
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error;
            }
        },
        async markOrderDone({ commit, getters }, payload) {

            commit('clearError');
            commit('setLoading', true);
            try {
                await firebase.database().ref(`/users/${getters.getUser.id}/orders`).child(payload).update({
                    done: true
                })
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error;
            }
        },
    }
}