<template>
    <div class="col-12 mt-3 mt-md-0 col-md-5 btn-group">
        <button class="btn " @click="filterTodoArr('all')" :class="filter === 'all' ? 'btn-primary' : 'btn-secondary'">
            All
        </button>
        <button class="btn" @click="filterTodoArr('active')" :class="filter === 'active' ? 'btn-primary' : 'btn-secondary'">
            Active
        </button>
        <button class="btn" @click="filterTodoArr('done')" :class="filter === 'done' ? 'btn-primary' : 'btn-secondary'">
            Done
        </button>
    </div>
</template>

<script>
import { eventBus } from '../../../main';
export default {
    props: {
        filter: {
            type: String, 
            required: true
        }
    },
    methods: {
        filterTodoArr(str) {
            eventBus.$emit('filterTodoArr', str)
        }
    }
};
</script>

<style lang="scss" scoped></style>
