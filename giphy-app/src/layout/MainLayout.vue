<template>
    <div>
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '@/components/AppPartials/Header'
export default {
    name: 'MainLayout',
    components: {
        Header,
    },
    computed: {
        favorites() {
            return this.$store.getters.favorites
        },
    },
    watch: {
        favorites: {
            deep: true,
            handler(val) {
                localStorage.setItem('favorites', JSON.stringify(val))
            },
        },
    },
    mounted() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || []
        if (favorites.length) {
            this.$store.commit('setFavorites', favorites)
        }
    },
}
</script>

<style lang="scss" scoped></style>
