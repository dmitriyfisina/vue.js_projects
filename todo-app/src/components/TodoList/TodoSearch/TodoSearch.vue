<template>
    <div class="mt-3 search-wrapper">
        <input
            v-model.trim="search"
            class="form-control"
            type="text"
            placeholder="Start typing for search"
        />
        <button @click="search = ''" v-if="search" class="btn btn-sm">
            <i class="fas fa-times"></i>
        </button>
    </div>
</template>

<script>
import { eventBus } from '../../../main';
export default {
    data() {
        return {
            search: '',
        };
    },
    watch: {
        search() {
            eventBus.$emit('writeSearch', this.search);
        }
    }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
    position: relative;
    & button {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
}
</style>
