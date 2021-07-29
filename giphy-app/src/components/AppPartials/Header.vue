<template>
    <div>
        <header class="bg-dark py-4 mb-4">
            <b-container>
                <b-row cols="1" cols-sm="2">
                    <b-col>
                        <nav class="d-flex justify-content-center justify-content-sm-start">
                            <b-nav>
                                <b-nav-item active-class="active" :exact="true" to="/"
                                    >Home</b-nav-item
                                >
                                <b-nav-item active-class="active" to="/favorites">Favorites</b-nav-item>
                            </b-nav>
                        </nav>
                    </b-col>
                    <b-col class="mt-2 mt-sm-0">
                        <SearchPanel />
                    </b-col>
                </b-row>
            </b-container>
        </header>
    </div>
</template>

<script>
import SearchPanel from './SearchPanel.vue'
export default {
    name: 'Header',
    components: {
        SearchPanel
    }
}
</script>

<style lang="scss" scoped></style>
