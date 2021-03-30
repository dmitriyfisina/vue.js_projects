<template>
    <div class="row mt-3">
        <TodoAddPanel class="col-12 col-md-7" />
        <TodoFilterButtons :filter="filter" class="col-12 mt-3 mt-md-0 col-md-5 btn-group" />
    </div>
</template>

<script>
import TodoAddPanel from './TodoAddPanel';
import TodoFilterButtons from './TodoFilterButtons';
export default {
    props: {
        filter: {
            type: String,
            required: true
        }
    },
    components: {
        TodoAddPanel,
        TodoFilterButtons,
    },
};
</script>

<style lang="scss" scoped></style>
