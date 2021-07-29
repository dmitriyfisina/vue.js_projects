<template>
    <a href="#" :title="gif.title" @click.prevent class="gif d-block">
        <img :src="srcUrl" :alt="gif.title" />
        <div class="gif__add-to-favorites" @click="toggleFavorites(gif)">
            <b-icon
                :class="favorites ? 'fill-blue' : 'fill-gray'"
                scale="0.9"
                icon="heart-fill"
                aria-hidden="true"
            ></b-icon>
        </div>
    </a>
</template>

<script>
export default {
    props: ['srcUrl', 'favorites', 'gif'],
    methods: {
        toggleFavorites(gif) {
            if (gif.favorites) {
                gif.favorites = false
                this.$root.$bvToast.toast(`Gif ${gif.title} successfuly removed from favorites`, {
                    title: 'Success',
                    variant: 'success',
                    toaster: 'b-toaster-top-center',
                    solid: true,
                    autoHideDelay: 3000,
                })
                this.$store.commit('removeFavorites', gif)
            } else {
                gif.favorites = true
                this.$bvToast.toast(`Gif ${gif.title} successfuly added to favorites`, {
                    title: 'Success',
                    variant: 'success',
                    toaster: 'b-toaster-top-center',
                    solid: true,
                    autoHideDelay: 3000,
                })
                this.$store.commit('addFavorites', gif)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.gif {
    cursor: pointer;
    height: 368px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &__add-to-favorites {
        background-color: #fff;
        position: absolute;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        .fill-gray {
            fill: #c0c0c0;
        }
        .fill-blue {
            fill: #007bff;
        }
    }
    &:hover {
        .gif__add-to-favorites {
            opacity: 1;
        }
    }
}
</style>
