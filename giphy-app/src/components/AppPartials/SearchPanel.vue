<template>
    <b-input-group>
        <template #prepend>
            <b-input-group-text
                ><b-icon scale="0.8" icon="search" aria-hidden="true"></b-icon
            ></b-input-group-text>
        </template>
        <b-form-input
            @change="searchHandler"
            v-model="queryString"
            size="lg"
            type="search"
            placeholder="Search GIF"
        ></b-form-input>
    </b-input-group>
</template>

<script>
export default {
    name: 'SearchPanel',
    data: () => ({
        queryString: '',
    }),
    methods: {
        async searchHandler() {
            try {
                await this.$store.dispatch('searchGifs', {
                    limit: 20,
                    offset: 0,
                    queryString: this.queryString,
                    set: true,
                })
                this.$store.commit('setQueryString', this.queryString)
            } catch (error) {
                return error
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
