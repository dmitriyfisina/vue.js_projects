<template>
    <div>
        <v-container v-if="!loading">
            <v-card>
                <v-img max-height="450" min-height="200" :src="ad.imageSrc"></v-img>
                <v-card-title>
                    <h2 class="text--primary">{{ ad.title }}</h2>
                </v-card-title>
                <v-card-text>
                    <p>
                        {{ ad.description }}
                    </p>
                </v-card-text>
                <v-card-actions class="pb-4 flex-wrap">
                    <EditAdModal :ad="ad" v-if="isOwner" />
                    <BuyModal minWidth="100px" :ad="ad" />
                </v-card-actions>
            </v-card>
        </v-container>
        <div v-else>
            <div class="text-center pt-5 progress-circular">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </div>
        </div>
    </div>
</template>

<script>
import EditAdModal from './EditAdModal';
import BuyModal from '@/components/Shared/BuyModal';
export default {
    name: 'Ad',
    components: {
        EditAdModal,
        BuyModal,
    },
    computed: {
        ad() {
            const id = this.$route.params.id;
            return this.$store.getters.adById(id);
        },
        loading() {
            return this.$store.getters.getLoading;
        },
        isOwner() {
            return this.ad.ownerId === this.$store.getters.getUser.id;
        },
    },
};
</script>
