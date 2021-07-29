import { giphy } from '@/api/index'
import endpoints from '@/api/endpoints'

export default {
    state: {
        gifs: [],
        searchGifs: [],
        queryString: ''
    },
    mutations: {
        addGifs(state, payload) {
            state.gifs.push(...payload)
        },
        setGifs(state, payload) {
            state.gifs = payload
        },
        setSearchGifs(state, payload) {
            state.searchGifs = payload
        },
        addSearchGifs(state, payload) {
            state.searchGifs.push(...payload)
        },
        setQueryString(state, payload) {
            state.queryString = payload
        }
    },
    actions: {
        async fetchGif({ commit, getters }, { limit, offset, set }) {
            try {
                const response = await giphy.get(endpoints.trending, {
                    params: { limit, offset },
                })
                const favorites = getters.favorites
                let transformResponse = null
                if (favorites.length) {
                    transformResponse = response.data.data.map((gifItem) => {
                        const equal = favorites.find((favItem) => favItem.id === gifItem.id)
                        if (equal) {
                            return equal
                        } else return {
                            favorites: false,
                            ...gifItem
                        }
                    })
                } else {
                    transformResponse = response.data.data.map((item) => {
                        return {
                            favorites: false,
                            ...item
                        }
                    })
                }
                if (set) {
                    commit('setGifs', transformResponse)
                } else {
                    commit('addGifs', transformResponse)
                }
                return response
            } catch (error) {
                commit('clearError')
                commit('setError', error.response.statusText)
                throw error
            }
        },
        async searchGifs({ commit, getters }, { limit, offset, queryString, set }) {
            try {
                const response = await giphy.get(endpoints.search, {
                    params: { limit, offset, q: queryString },
                })
                const favorites = getters.favorites
                let transformResponse = null
                if (favorites.length) {
                    transformResponse = response.data.data.map((gifItem) => {
                        const equal = favorites.find((favItem) => favItem.id === gifItem.id)
                        if (equal) {
                            return equal
                        } else return {
                            favorites: false,
                            ...gifItem
                        }
                    })
                } else {
                    transformResponse = response.data.data.map((item) => {
                        return {
                            favorites: false,
                            ...item
                        }
                    })
                }
                if (set) {
                    commit('setSearchGifs', transformResponse)
                } else {
                    commit('addSearchGifs', transformResponse)
                }
                return response
            } catch (error) {
                commit('clearError')
                commit('setError', error.response.statusText)
                throw error
            }
        }
    },
    getters: {
        gifs: (state) => state.gifs,
        searchGifs: (state) => state.searchGifs,
        queryString: (state) => state.queryString,
    }
}