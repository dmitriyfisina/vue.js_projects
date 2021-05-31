<template>
    <ais-pagination v-if="!!inputQuery">
        <ul
            class="pagination justify-content-center flex-wrap"
            slot-scope="{
                currentRefinement,
                nbPages,
                pages,
                isFirstPage,
                isLastPage,
                refine,
                createURL,
            }"
        >
            <li class="page-item" v-if="!isFirstPage">
                <a class="page-link" :href="createURL(0)" @click.prevent="refine(0)">
                    ‹‹
                </a>
            </li>
            <li class="page-item" v-if="!isFirstPage">
                <a
                    class="page-link"
                    :href="createURL(currentRefinement - 1)"
                    @click.prevent="refine(currentRefinement - 1)"
                >
                    ‹
                </a>
            </li>
            <template v-if="nbPages > 1">
                <li
                    class="page-item"
                    v-for="page in pages"
                    :key="page"
                    :class="{ active: page === currentRefinement }"
                >
                    <a class="page-link" :href="createURL(page)" @click.prevent="refine(page)">
                        {{ page + 1 }}
                    </a>
                </li>
            </template>
            <li class="page-item" v-if="!isLastPage">
                <a
                    class="page-link"
                    :href="createURL(currentRefinement + 1)"
                    @click.prevent="refine(currentRefinement + 1)"
                >
                    ›
                </a>
            </li>
            <li class="page-item" v-if="!isLastPage">
                <a class="page-link" :href="createURL(nbPages)" @click.prevent="refine(nbPages)">
                    ››
                </a>
            </li>
        </ul>
    </ais-pagination>
</template>

<script>
export default {
    props: ['inputQuery'],
}
</script>
