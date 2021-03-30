<template>
    <v-dialog width="400px" v-model="modal">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                :min-width="minWidth"
                class="ml-1"
                :class="flexGrow ? 'flex-grow-1' : ''"
                color="success"
                slot="activator"
                >Buy</v-btn
            >
        </template>
        <v-card>
            <v-card-title class="justify-space-between">
                <h4>Do you want to buy it?</h4>
                <v-btn icon @click="onCancel">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field label="Name" name="name" type="text" v-model="name"></v-text-field>
                <v-text-field label="Phone" name="phone" type="tel" v-model="phone"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    :disabled="localLoading"
                    :loading="localLoading"
                    color="success"
                    @click="onSave"
                    >Save</v-btn
                >
                <v-btn :disabled="localLoading" text color="secondary" @click="onCancel"
                    >Close</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['ad', 'minWidth', 'width', 'flexGrow'],
    data() {
        return {
            modal: false,
            name: '',
            phone: '',
            localLoading: false,
        };
    },
    methods: {
        onCancel() {
            this.modal = false;
            this.name = '';
            this.phone = '';
        },
        onSave() {
            if (this.name && this.phone) {
                this.localLoading = true;
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.ownerId,
                })
                .finally(() => {
                    this.localLoading = false;
                    this.modal = false;
                    this.name = '',
                    this.phone = ''
                })
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
