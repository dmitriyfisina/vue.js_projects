export default {
    state: {
        favorites: []
    },
    mutations: {
        addFavorites(state, payload) {
            state.favorites.push(payload)
        },
        setFavorites(state, payload) {
            state.favorites = payload
        },
        removeFavorites(state, payload) {
            state.favorites = state.favorites.filter((item) => item !== payload)
        }
    },
    getters: {
        favorites: (state) => state.favorites
    }
}