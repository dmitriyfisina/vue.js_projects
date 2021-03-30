import firebase from 'firebase/app'
import "firebase/database"
import "firebase/storage";

class Ad {
    constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.imageSrc = imageSrc;
        this.promo = promo;
        this.id = id;
    }
}

export default {
    state: {
        ads: []
    },
    getters: {
        ads({ ads }) {
            return ads;
        },
        promoAds({ ads }) {
            return ads.filter((ad) => ad.promo);
        },
        myAds({ ads }, getters) {
            if (ads) {
                return ads.filter((item) => item.ownerId === getters.getUser.id);
            }
        },
        adById({ ads }) {
            return (adId) => ads.find((ad) => ad.id === adId);
        },
    },
    mutations: {
        createAd({ ads }, payload) {
            ads.push(payload);
        },
        setAds(state, payload) {
            state.ads = payload;
        },
        updateAd(state, { title, description, id }) {
            const ad = state.ads.find((item) => item.id === id);
            ad.title = title;
            ad.description = description;
        }
    },
    actions: {
        async createAd({ commit, getters }, payload) {
            commit('clearError');
            commit('setLoading', true);

            const image = payload.image;

            try {
                const newAd = new Ad(
                    payload.title,
                    payload.description,
                    getters.getUser.id,
                    '',
                    payload.promo
                )
                const ad = await firebase.database().ref('ads').push(newAd);
                const imageExt = image.name.slice(image.name.lastIndexOf('.') + 1);

                await firebase.storage().ref(`ads/${ad.key}.${imageExt}`).put(image);

                const fileData = firebase.storage().ref().child(`ads/${ad.key}.${imageExt}`);
                const imageSrc = await fileData.getDownloadURL();

                await firebase.database().ref('ads').child(ad.key).update({
                    imageSrc
                })

                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    imageSrc
                })
                commit('setLoading', false);
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async fetchAds({ commit }) {
            commit('clearError');
            commit('setLoading', true);

            const resultAds = [];

            try {
                const firebaseValue = await firebase.database().ref('ads').once('value');
                const ads = firebaseValue.val();
                if (ads) {
                    Object.keys(ads).forEach((key) => {
                        const ad = ads[key];

                        resultAds.push(new Ad(
                            ad.title,
                            ad.description,
                            ad.ownerId,
                            ad.imageSrc,
                            ad.promo,
                            key
                        ))
                    })
                    commit('setAds', resultAds);
                }
                commit('setLoading', false);
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async updateAd({ commit }, { title, description, id }) {
            commit('clearError');
            commit('setLoading', true);

            try {
                await firebase.database().ref('ads').child(id).update({
                    title, description
                })
                commit('updateAd', { title, description, id })
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        }
    }
}