<template>
    <div v-if="!loading">
        <v-container fluid class="pa-0">
            <v-carousel
                cycle
                hide-delimiter-background
                progress
                show-arrows-on-hover
                delimiter-icon="mdi-minus"
            >
                <v-carousel-item v-for="ad in promoAds" :key="ad.id" :src="ad.imageSrc">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-btn :to="'/ad/' + ad.id" x-large color="pink accent-3">{{
                            ad.title
                        }}</v-btn>
                    </v-row>
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <v-container>
            <v-row class="mt-5 mb-5">
                <v-col v-for="ad in ads" :key="ad.id" cols="12" sm="6" md="4">
                    <v-card class="fill-height d-flex flex-column">
                        <v-img height="250" max-height="250" :src="ad.imageSrc"></v-img>

                            <v-card-title class="pb-0">{{ ad.title }}</v-card-title>

                            <v-card-text>
                                <div>
                                    {{ ad.description }}
                                </div>
                            </v-card-text>

                            <v-card-actions class="mt-auto">
                                <v-btn :to="'/ad/' + ad.id" class="flex-grow-1 mr-1" color="blue" dark>
                                    Open
                                </v-btn>
                                <BuyModal :flexGrow="true" :ad="ad" />
                            </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else>
        <div class="text-center pt-5 progress-circular">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>
    </div>
</template>

<script>
import BuyModal from '@/components/Shared/BuyModal'
export default {
    name: 'Home',
    components: {
        BuyModal
    },
    computed: {
        ads() {
            return this.$store.getters.ads;
        },
        promoAds() {
            return this.$store.getters.promoAds;
        },
        loading() {
            return this.$store.getters.getLoading;
        },
    }
};
</script>

<style lang="scss" scoped>
</style>
