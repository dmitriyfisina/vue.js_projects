<template>
    <div>
        <input
            v-model.trim="newTodo"
            @keyup.enter="addNewTodo"
            type="text"
            class="form-control "
            placeholder="Type new todo end press enter"
        />
    </div>
</template>

<script>
import { eventBus } from '../../../main';
export default {
    data() {
        return {
            newTodo: '',
        };
    },
    methods: {
        addNewTodo() {
            eventBus.$emit('addNewTodo', this.newTodo);
            this.newTodo = '';
        },
    },
};
</script>

<style lang="scss" scoped></style>
