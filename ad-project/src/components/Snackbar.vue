<template>
    <div v-if="error">
        <v-snackbar :value="true" :multi-line="true">
            {{ error }}

            <template v-slot:action="{ attrs }">
                <v-btn color="red" text v-bind="attrs" @click="onClose">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'Snackbar',
    computed: {
        error() {
            return this.$store.getters.getError;
        },
    },
    methods: {
        onClose() {
            this.$store.dispatch('clearError');
        },
    },
};
</script>

<style lang="scss" scoped></style>
