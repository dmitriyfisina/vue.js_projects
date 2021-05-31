<template>
    <div class="app font-monospace">
        <Header />
        <b-container>
            <Modal />
            <ais-instant-search :search-client="searchClient" index-name="npm-search">
                <AisMain />
            </ais-instant-search>
        </b-container>
        <Footer />
    </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import AisMain from '@/components/SearchComponents/AisMain'
import Header from '@/components/App/Header'
import Footer from '@/components/App/Footer'
import Modal from '@/components/Modal/Modal'
export default {
    components: {
        AisMain,
        Header,
        Footer,
        Modal
    },
    data() {
        return {
            searchClient: algoliasearch(this.$algoliaAppId, this.$algoliaApiKey),
        }
    },
}
</script>

<style>
.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #efefef;
}
.cursor-pointer {
    cursor: pointer;
}
pre {
    padding: 16px;
    background: #f6f8fa;
}
</style>
