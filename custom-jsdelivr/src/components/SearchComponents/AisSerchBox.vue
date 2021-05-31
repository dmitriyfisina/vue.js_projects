<template>
    <ais-search-box v-model="inputQuery">
        <div slot-scope="{ currentRefinement, refine }">
            <input
                placeholder="Search all of npm..."
                type="search"
                :value="currentRefinement"
                @input="searchBoxInput(refine, $event)"
                class="form-control"
            />
        </div>
    </ais-search-box>
</template>

<script>
export default {
    props: ['inputQuery'],
    methods: {
        searchBoxInput(refine, $event) {
            refine($event.currentTarget.value)
            this.$emit('input', $event.target.value)
        },
    },
}
</script>
