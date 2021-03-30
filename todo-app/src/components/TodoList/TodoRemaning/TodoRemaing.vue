<template>
    <h6 class="items-left mb-0 text-primary">{{ remaining }} items left, {{ complated }} complated</h6>
</template>

<script>
export default {
    props: {
        remaining: {
            type: Number,
            required: true
        },
        complated: {
            type: Number,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped></style>
