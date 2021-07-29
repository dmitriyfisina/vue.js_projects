<template>
    <div id="app" class="pb-4">
        <MainLayout />
    </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout'
export default {
    components: {
        MainLayout,
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        favorites() {
            return this.$store.getters.favorites
        },
    },
    watch: {
        error: {
            deep: true,
            handler(val) {
                this.$bvToast.toast(`${val}`, {
                    title: 'Error message',
                    variant: 'danger',
                    toaster: 'b-toaster-top-center',
                    solid: true,
                    autoHideDelay: 3000,
                })
            },
        },
    },
}
</script>
