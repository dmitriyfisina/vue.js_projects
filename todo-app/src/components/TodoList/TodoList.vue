<template>
    <div>
        <TodoRemaning :remaining="remaining" :complated="complated" />
        <TodoHeaderControls :filter="filter" />
        <p v-if="noTasks" class="text-danger font-weight-bold mt-3">No items</p>
        <transition-group
            tag="ul"
            class="list-group mt-4 list-wrapper"
            name="fade"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeft"
        >
            <TodoListItem
                v-for="(item, index) in !search ? todoArrFiltred : searchTodo"
                :key="item.id"
                :index="index"
                :item="item"
            />
        </transition-group>
        <TodoBottomControls :complated="complated" :remaining="remaining" />
        <TodoSearch />
    </div>
</template>

<script>
import TodoListItem from './TodoListItem/TodoListItem';
import TodoRemaning from './TodoRemaning/TodoRemaing';
import TodoHeaderControls from './TodoHeaderControls/TodoHeaderControls';
import TodoBottomControls from './TodoBottomControls/TodoBottomControls';
import TodoSearch from './TodoSearch/TodoSearch';
import { eventBus } from '../../main';
export default {
    name: 'TodoList',
    components: {
        TodoListItem,
        TodoRemaning,
        TodoHeaderControls,
        TodoBottomControls,
        TodoSearch,
    },
    data() {
        return {
            cacheTodoTitle: '',
            filter: 'all',
            search: '',
            nextIdTodo: 4,
            todoArr: [
                { id: 1, title: 'Learn Vue.js', complated: false, editing: false },
                {
                    id: 2,
                    title: 'Build awesome Vue App',
                    complated: false,
                    editing: false,
                },
                {
                    id: 3,
                    title: 'Dont forget about relax',
                    complated: false,
                    editing: false,
                },
            ],
        };
    },
    methods: {
        addNewTodo(str) {
            if (str.length > 0) {
                this.nextIdTodo += 1;
                this.todoArr.push({
                    id: this.nextIdTodo,
                    title: str,
                    complated: false,
                    editing: false,
                });
            }
        },
        deleteTodo(id) {
            this.todoArr = this.todoArr.filter((item) => {
                return item.id !== id;
            });
        },
        startEdit(item) {
            this.todoArr.forEach((item) => {
                if (item.editing) {
                    this.cancelEdit(item);
                }
            });
            this.cacheTodoTitle = item.title;
            item.editing = true;
        },
        editDone(item) {
            if (item.title.length > 0) {
                item.editing = false;
                this.cacheTodoTitle = item.title;
            }
        },
        cancelEdit(item) {
            item.title = this.cacheTodoTitle;
            item.editing = false;
        },
        checkAll() {
            this.todoArr.forEach((item) => {
                item.complated = event.target.checked;
            });
        },
        clearComplated() {
            this.todoArr = this.todoArr.filter((item) => !item.complated);
        },
        filterTodoArr(str) {
            this.filter = str;
        },
        writeSearch(str) {
            this.search = str;
        },
    },
    computed: {
        remaining() {
            return this.todoArr.filter((item) => !item.complated).length;
        },
        complated() {
            return this.todoArr.filter((item) => item.complated).length;
        },
        todoArrFiltred() {
            switch (this.filter) {
                case 'all':
                    return this.todoArr;
                case 'active':
                    return this.todoArr.filter((item) => !item.complated);
                case 'done':
                    return this.todoArr.filter((item) => item.complated);
                default:
                    return this.todoArr;
            }
        },
        noTasks() {
            if (this.filter === 'all' && this.todoArr.length < 1) return true;
            else if (this.filter === 'active' && !this.remaining) return true;
            else if (this.filter === 'done' && this.remaining === this.todoArr.length) return true;
            else return false;
        },
        searchTodo() {
            if (this.search.length > 0) {
                return this.todoArr.filter(
                    (item) => item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                );
            } else return this.todoArr;
        },
    },
    created() {
        if (localStorage.todoArr) {
            this.todoArr = JSON.parse(localStorage.todoArr);
        }
        if (localStorage.nextIdTodo) {
            this.nextIdTodo = +localStorage.nextIdTodo;
        }
        eventBus.$on('deleteTodo', (id) => this.deleteTodo(id));
        eventBus.$on('startEdit', (item) => this.startEdit(item));
        eventBus.$on('editDone', (item) => this.editDone(item));
        eventBus.$on('cancelEdit', (item) => this.cancelEdit(item));
        eventBus.$on('addNewTodo', (str) => this.addNewTodo(str));
        eventBus.$on('filterTodoArr', (str) => this.filterTodoArr(str));
        eventBus.$on('clearComplated', () => this.clearComplated());
        eventBus.$on('checkAll', () => this.checkAll());
        eventBus.$on('writeSearch', (payload) => this.writeSearch(payload));
    },
    beforeDestroy() {
        eventBus.$off('deleteTodo', (id) => this.deleteTodo(id));
        eventBus.$off('startEdit', (item) => this.startEdit(item));
        eventBus.$off('editDone', (item) => this.editDone(item));
        eventBus.$off('cancelEdit', (item) => this.cancelEdit(item));
        eventBus.$off('addNewTodo', (str) => this.addNewTodo(str));
        eventBus.$off('filterTodoArr', (str) => this.filterTodoArr(str));
        eventBus.$off('clearComplated', () => this.clearComplated());
        eventBus.$off('checkAll', () => this.checkAll());
        eventBus.$off('writeSearch', (payload) => this.writeSearch(payload));
    },
    watch: {
        todoArr(newArr) {
            localStorage.todoArr = JSON.stringify(newArr);
        },
        nextIdTodo(newId) {
            localStorage.nextIdTodo = newId;
        },
    },
};
</script>

<style lang="scss" scoped>
@import url('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');

.list-wrapper {
    max-height: 320px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 7px;
        border-radius: 5px;
        background-color: #e6e6e6;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #007bff;
        width: 100%;
        border-radius: 5px;
    }
}
.list-item {
    animation-duration: 0.5s;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 30px;
        i {
            font-size: 12px;
            text-decoration: none !important;
        }
    }
    &__edit-todo {
        input {
            width: 85%;
        }
    }
}
.list-item-complated {
    .list-item__content {
        :not(.btn) {
            text-decoration: line-through;
        }
    }
}
</style>
