<template>
    <div class="mt-4 mb-4">
        <ais-configure :hitsPerPage="10" />
        <AisSerchBox v-model="inputQuery" />
        <AisStateResult />
        <AisPagination :inputQuery="inputQuery" />
    </div>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch'
import AisPagination from '@/components/SearchComponents/AisPagination'
import AisSerchBox from '@/components/SearchComponents/AisSerchBox'
import AisStateResult from '@/components/SearchComponents/AisStateResult'
export default {
    components: {
        AisPagination,
        AisSerchBox,
        AisStateResult
    },
    data: () => ({
        inputQuery: '',
    }),
    mixins: [createWidgetMixin({ connector: true })],

    mounted() {
        this.$store.commit('setInstantSearchInstance', this.instantSearchInstance)
    },
}
</script>

<style lang="scss" scoped></style>
