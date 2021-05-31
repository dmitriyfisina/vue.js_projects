<template>
    <table v-if="state" class="table table-hover border">
        <thead>
            <tr class="bg-secondary bg-gradient text-white">
                <th>#</th>
                <th>Name</th>
                <th class="d-none d-sm-table-cell">last version</th>
                <th>GitHub</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) in state.hits"
                :key="item.objectID"
                @click="selectedHit(item, $event)"
                class="bg-white cursor-pointer"
            >
                <td>{{ ++index }}</td>
                <td>{{ item.name }}</td>
                <td class="d-none d-sm-table-cell">{{ item.version }}</td>
                <td class="align-middle">
                    <b-button
                        class="w-100 bg-gradient gitHubButton"
                        v-if="item.repository"
                        size="sm"
                        target="_blanc"
                        variant="outline-primary"
                        :href="item.repository.url"
                        >GitHub</b-button
                    >
                    <p v-else class="text-center text-bold m-0">-</p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch'
import { connectHits } from 'instantsearch.js/es/connectors'

export default {
    mixins: [createWidgetMixin({ connector: connectHits })],
    methods: {
        selectedHit(hit, $event) {
            if (!$event.target.classList.contains('gitHubButton')) {
                this.$store.commit('setSelectedHit', hit)
                this.$store.commit('setIsOpenModal', true)
            }
        },
    },
    watch: {
        state({ hits }) {
            this.$store.commit('setHits', hits)
        },
    },
}
</script>
<style lang="scss" scoped>
table {
    thead,
    tbody {
        tr {
            th,
            td {
                &:last-child {
                    max-width: 110px;
                    width: 110px;
                }
            }
        }
    }
}
</style>
