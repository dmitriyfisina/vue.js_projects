<template>
    <div class="app">
        <div class="container">
            <AppHeader class="app-header" />
            <TodoList />
        </div>
    </div>
</template>

<script>
import TodoList from './components/TodoList/TodoList';
import AppHeader from './components/AppHeader/AppHeader';
export default {
    components: {
        TodoList,
        AppHeader,
    },
};
</script>

<style lang="scss">
.app {
    margin-top: 100px;
    max-width: 800px;
    margin: 0 auto;
    .app-header {
        margin-top: 100px;
    }
}
</style>
