<template>
    <b-modal
        v-model="isOpenModal"
        @hidden="hit = {}"
        button-size="sm"
        header-border-variant="0"
        footer-border-variant="0"
        id="modal-hit"
        size="lg"
        :hide-header="loading ? true : false"
        :hide-footer="loading ? true : false"
    >
        <template v-if="Object.keys(hit).length > 0 && !loading" v-slot:modal-header>
            <div>
                <h3>{{ hit.name }}</h3>
                <img :src="hit.badge ? hit.badge.url : ''" alt="" />
            </div>
            <b-button size="sm" @click="closeModal('modal-hit')">
                x
            </b-button>
        </template>
        <template v-if="Object.keys(hit).length > 0 && !loading" v-slot:default>
            <div>
                <h6>{{ hit.description }}</h6>
                <table class="table mt-4">
                    <tbody>
                        <tr>
                            <td>Homepage</td>
                            <td>
                                <b-button
                                    v-if="hit.homepage"
                                    size="sm"
                                    variant="outline-primary"
                                    target="_blanc"
                                    :href="hit.homepage"
                                    >{{ hit.homepage }}</b-button
                                >
                                <span v-else>-</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Last version</td>
                            <td>
                                <span v-if="hit.version">
                                    {{ hit.version }}
                                </span>
                                <span v-else>-</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Downloads Last 30 Days</td>
                            <td>
                                <span v-if="hit.humanDownloadsLast30Days">
                                    {{ hit.humanDownloadsLast30Days }}
                                </span>
                                <span v-else>-</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Last crawl</td>
                            <td>
                                <span v-if="hit.lastCrawl">
                                    {{ hit.lastCrawl | dateFilter('datetime') }}
                                </span>
                                <span v-else>-</span>
                            </td>
                        </tr>
                        <tr>
                            <td>License</td>
                            <td>
                                <span v-if="hit.license">{{ hit.license }}</span>
                                <span v-else>-</span>
                            </td>
                        </tr>
                        <tr>
                            <td>GitHub</td>
                            <td>
                                <b-button
                                    class="bg-gradient"
                                    v-if="hit.repository"
                                    size="sm"
                                    target="_blanc"
                                    variant="primary"
                                    :href="hit.repository.url"
                                    >GitHub</b-button
                                >
                                <span v-else>-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="markdown-readme" v-if="hit.readme">
                    <VueShowdown :markdown="hit.readme" />
                </div>
            </div>
        </template>
        <div v-else class="d-flex justify-content-center">
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <template v-slot:modal-footer>
            <b-button size="sm" @click="closeModal('modal-hit')">
                Close
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import dateFilter from '@/filters/dateFilter'
export default {
    data: () => ({
        hit: {},
        loading: true,
    }),
    computed: {
        isOpenModal: {
            get() {
                return this.$store.getters.isOpenModal
            },
            set(newValue) {
                this.isOpenModal = newValue
            },
        },
    },
    methods: {
        closeModal() {
            this.$store.commit('setIsOpenModal', false)
        },
    },
    mounted() {
        this.$root.$on('bv::modal::hide', (bvEvent) => {
            if (bvEvent.trigger === 'backdrop') {
                bvEvent.preventDefault()
                this.$store.commit('setIsOpenModal', false)
            }
            document.body.classList.remove('overflow-hidden')
            document.body.classList.add('overflow-auto')
        })
        this.$root.$on('bv::modal::show', async () => {
            document.body.classList.remove('overflow-auto')
            document.body.classList.add('overflow-hidden')
            this.loading = true
            try {
                this.hit = await this.$store.dispatch('getInfoHit')
            } catch (error) {
                return error
            }
            this.loading = false
        })
    },
    filters: {
        dateFilter,
    },
}
</script>

<style lang="scss" scoped>
.markdown-readme {
    overflow: auto;
}
.lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}
.lds-roller div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0d6efd;
    margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
}
.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
}
.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
}
.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}
.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
}
.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
}
.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
}
.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
}
@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
