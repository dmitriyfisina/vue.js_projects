<template>
    <b-container>
        <transition name="fade">
            <b-row v-if="!favorites.length">
                <b-col>
                    <p>You have no favorites gif</p>
                </b-col>
            </b-row>
        </transition>
        <transition-group tag="div" class="row" name="fade">
            <b-col cols="12" sm="6" md="4" lg="3" v-for="gif in favorites" :key="gif.id">
                <GifItem :srcUrl="gif.images.original.url" :favorites="gif.favorites" :gif="gif" iconName="trash-fill" />
            </b-col>
        </transition-group>
    </b-container>
</template>

<script>
import GifItem from '@/components/Gifs/GifItem'
export default {
    name: 'Favorites',
    components: {
        GifItem,
    },
    computed: {
        favorites() {
            return this.$store.getters.favorites
        },
    },
}
</script>

<style lang="scss" scoped>
.row {
    row-gap: 24px;
}
.fade-enter-active {
    animation: fade-down 0.3s;
}
.fade-leave-active {
    animation: fade-down 0.3s reverse;
}
@keyframes fade-down {
    0% {
        opacity: 0;
        transform: translateY(100px);
    }
    50% {
        opacity: 0.5;
        transform: translateY(50px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
