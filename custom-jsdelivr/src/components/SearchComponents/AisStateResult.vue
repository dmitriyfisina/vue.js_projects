<template>
    <div class="mt-4">
        <ais-state-results>
            <template slot-scope="{ results: { hits, query } }">
                <AisHits v-if="hits.length > 0 && query.length > 0" />
                <div v-else-if="query.length > 0">No results have been found for {{ query }}.</div>
                <div v-else></div>
            </template>
        </ais-state-results>
    </div>
</template>

<script>
import AisHits from '@/components/SearchComponents/AisHits'
export default {
    components: {
        AisHits,
    },
}
</script>

<style lang="scss" scoped></style>
