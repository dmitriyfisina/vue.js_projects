<template>
    <div class="d-flex mt-2 align-items-center todo-bottom-controls">
        <TodoCheckAll :remaining="remaining" />
        <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <TodoClearComplated :complated="complated" />
        </transition>
    </div>
</template>

<script>
import TodoCheckAll from './TodoCheckAll/TodoCheckAll';
import TodoClearComplated from './TodoClearComplated/TodoClearComplated';
export default {
    props: {
        complated: {
            type: Number,
            required: true,
        },
        remaining: {
            type: Number,
            required: true,
        },
    },
    components: {
        TodoCheckAll,
        TodoClearComplated,
    },
};
</script>

<style lang="scss" scoped>
.todo-bottom-controls {
    min-height: 31px;
}
</style>
