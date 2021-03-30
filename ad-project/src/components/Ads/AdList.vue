<template>
    <div>
        <v-container v-if="!loading && myAds.length !== 0">
            <h1 class="text--secondary">My ads</h1>
            <v-row class="mt-4">
                <v-col md="6" lg="4" sm="12" cols="12" v-for="ad in myAds" :key="ad.id">
                    <v-card elevation="10" class="ad fill-height">
                        <div class="d-flex flex-column flex-sm-row fill-height">
                            <div class="ad-img ">
                                <v-img min-height="200px" height="100%" :src="ad.imageSrc"></v-img>
                            </div>
                            <div class="d-flex ad-content flex-column flex-grow-1" width="200px">
                                <v-card-title>
                                    {{ ad.title }}
                                </v-card-title>
                                <v-card-subtitle>
                                    {{ ad.description }}
                                </v-card-subtitle>
                                <v-card-actions class="mt-auto">
                                    <v-btn :to="'/ad/' + ad.id" block dark color="primary"
                                        >Open</v-btn
                                    >
                                </v-card-actions>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="myAds.length === 0 && !loading"><h1 class="text--secondary">You have no ads</h1></v-container>
        <div v-else>
            <div class="text-center pt-5 progress-circular">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdList',
    computed: {
        myAds() {
            return this.$store.getters.myAds;
        },
        loading() {
            return this.$store.getters.getLoading;
        },
    },
};
</script>
<style lang="scss" scoped>
.ad-img {
    overflow: hidden;
    border-radius: 4px 0 0 4px;
    flex-basis: 45%;
    img {
        width: 100%;
        height: 100%;
        min-height: 200px;
        object-fit: cover;
    }
}
.ad-content {
    flex-basis: 65%;
}
</style>
