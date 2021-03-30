<template>
    <label class="flex-grow-1 mb-0 ">
        <input type="checkbox" @change="checkAll" :checked="!remaining" />
        Check all
    </label>
</template>

<script>
import { eventBus } from '../../../../main';
export default {
    props: {
        remaining: {
            type: Number,
            required: true,
        },
    },
    methods: {
        checkAll() {
            eventBus.$emit('checkAll');
        }
    }
};
</script>

<style lang="scss" scoped></style>
