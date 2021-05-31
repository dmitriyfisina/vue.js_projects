import { jsvDelivrUrl } from '@/api/jsvDelivr'

export default {
    state: {
        hits: [],
        selectedHit: {}
    },
    mutations: {
        setHits(state, payload) {
            state.hits = payload
        },
        setSelectedHit(state, payload) {
            state.selectedHit = payload
        },
    },
    actions: {
        async getInfoHit({ getters }) {
            try {
                const hit = getters.selectedHit
                const badge = await fetch(`${jsvDelivrUrl}${hit.name}/badge`)
                return {
                    ...hit,
                    badge
                }
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    },
    getters: {
        hits({ hits }) {
            return hits
        },
        selectedHit({ selectedHit }) {
            return selectedHit
        },
    },
}
