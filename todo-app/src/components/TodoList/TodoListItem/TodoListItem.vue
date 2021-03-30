<template>
    <li class="list-group-item list-item" :class="{ 'list-item-complated': item.complated }">
        <div v-if="!item.editing" class="list-item__content d-flex align-items-center">
            <input type="checkbox" class="checkbox-complate mr-2" v-model="item.complated" />
            <span class="list-item__title flex-grow-1"> {{ index + 1 }}. {{ item.title }}</span>
            <button title="Edit" @click="startEdit(item)" class="btn btn-sm btn-success mr-1">
                <i class="fas fa-pen"></i>
            </button>
            <button title="Remove" @click="deleteTodo(item.id)" class="btn btn-sm btn-danger">
                <i class="fa fa-trash"></i>
            </button>
        </div>

        <div v-else class="list-item__edit-todo d-flex align-items-center">
            <input
                type="text"
                class="form-control flex-grow-1"
                v-model="item.title"
                @keyup.enter="editDone(item)"
                @keyup.esc="cancelEdit(item)"
            />
            <button title="Cancel" @click="editDone(item)" class="btn btn-sm btn-success ml-4">
                <i class="fas fa-check"></i>
            </button>
            <button title="Cancel" @click="cancelEdit(item)" class="btn btn-sm btn-dark ml-1">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </li>
</template>

<script>
import { eventBus } from '../../../main';
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        deleteTodo(id) {
            eventBus.$emit('deleteTodo', id);
        },
        startEdit(item) {
            eventBus.$emit('startEdit', item);
        },
        editDone(item) {
            eventBus.$emit('editDone', item);
        },
        cancelEdit(item) {
            eventBus.$emit('cancelEdit', item);
        },
    },
};
</script>

<style lang="scss" scoped>
.list-item {
    min-height: 64px;
}
</style>
