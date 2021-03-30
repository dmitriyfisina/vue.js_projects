<template>
    <button v-if="complated" @click="clearComplated" class="btn btn-sm btn-secondary flex-grow-2">
        Clear completed
    </button>
</template>

<script>
import { eventBus } from '../../../../main';
export default {
    props: {
        complated: {
            type: Number,
            required: true
        }
    },
    methods: {
        clearComplated() {
            eventBus.$emit('clearComplated')
        }
    }
};
</script>

<style lang="scss" scoped></style>
