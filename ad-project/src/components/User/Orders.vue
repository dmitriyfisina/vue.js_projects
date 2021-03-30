<template>
    <div>
        <div v-if="loading">
            <div class="text-center pt-5 progress-circular">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </div>
        </div>
        <v-container v-else-if="!loading && orders.length > 0">
            <v-row justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                    <v-list subheader>
                        <h1 class="text--secondary">Orders</h1>
                        <v-card class="mt-5" elevation="2">
                            <v-list-item v-for="order in orders" :key="order.id">
                                <v-list-item-action align-self="center">
                                    <v-checkbox
                                        success
                                        :input-value="order.done"
                                        @change="markDone(order)"
                                    ></v-checkbox>
                                </v-list-item-action>

                                <v-list-item-content>
                                    <v-list-item-title>{{ order.name }}</v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ order.phone }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action align-self="center">
                                    <v-btn :to="'/ad/' + order.adId" color="primary">Open</v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-card>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else><h1 class="text--secondary">You have no orders</h1></v-container>
    </div>
</template>

<script>
export default {
    name: 'Orders',
    data() {
        return {};
    },
    computed: {
        loading() {
            return this.$store.getters.getLoading;
        },
        orders() {
            return [
                ...this.$store.getters.getOrders.filter((item) => !item.done),
                ...this.$store.getters.getOrders.filter((item) => item.done),
            ];
        },
    },
    methods: {
        markDone(order) {
            this.$store
                .dispatch('markOrderDone', order.id)
                .then(() => {
                    order.done = !order.done;
                })
                .catch(() => {});
        },
    },
    created() {
        this.$store.dispatch('fetchOrders');
    },
};
</script>
