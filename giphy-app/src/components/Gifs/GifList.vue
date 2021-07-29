<template>
    <b-container>
        <b-row v-if="loading" align-h="center">
            <b-col cols="1">
                <Loader />
            </b-col>
        </b-row>
        <b-row v-else-if="queryString && !searchGifs.length" align-h="center">
            <b-col>
                <p>Not found gif</p>
            </b-col>
        </b-row>
        <template v-else>
            <b-row class="row">
                <b-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="(gif, index) in queryString ? searchGifs : gifs"
                    :key="gif.id + index"
                >
                    <GifItem
                        :srcUrl="gif.images.original.url"
                        :favorites="gif.favorites"
                        :gif="gif"
                        iconName="heart-fill"
                    />
                </b-col>
            </b-row>
            <div class="d-flex justify-content-center p-4">
                <Loader v-if="buttonLoading" />
                <b-button variant="gray-medium" v-else @click="loadHendler">Load more</b-button>
            </div>
        </template>
    </b-container>
</template>

<script>
import Loader from '@/components/AppPartials/Loader'
import GifItem from './GifItem'
export default {
    name: 'GifList',
    components: {
        Loader,
        GifItem,
    },
    data: () => ({
        limit: 20,
        loading: false,
        buttonLoading: false,
    }),
    computed: {
        offsetGif() {
            return this.gifs.length
        },
        gifs() {
            return this.$store.getters.gifs
        },
        searchGifs() {
            return this.$store.getters.searchGifs
        },
        offsetSearchGifs() {
            return this.searchGifs.length
        },
        queryString() {
            return this.$store.getters.queryString
        },
    },
    methods: {
        async loadHendler() {
            this.buttonLoading = true
            try {
                if (this.searchGifs.length) {
                    await this.$store.dispatch('searchGifs', {
                        limit: this.limit,
                        offset: this.offsetSearchGifs,
                        queryString: this.queryString,
                        set: false,
                    })
                } else {
                    await this.$store.dispatch('fetchGif', {
                        limit: this.limit,
                        offset: this.offsetGif,
                        set: false,
                    })
                }
                this.buttonLoading = false
            } catch (error) {
                this.buttonLoading = false
                return error
            }
        },
    },
    async mounted() {
        if (!this.gifs.length) {
            try {
                this.loading = true
                await this.$store.dispatch('fetchGif', {
                    limit: this.limit,
                    offset: 0,
                    set: true,
                })
                this.loading = false
            } catch (error) {
                this.loading = false
                return error
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.row {
    row-gap: 24px;
}
</style>
