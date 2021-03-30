<template>
    <v-app>
        <v-navigation-drawer fixed temporary v-model="drawer">
            <v-list dense>
                <v-subheader>REPORTS</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item v-for="link in links" :key="link.title" :to="link.url">
                        <v-list-item-icon>
                            <v-icon v-text="link.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="link.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="isUserLoggedIn" @click="logout">
                        <v-list-item-icon>
                            <v-icon>logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark color="blue">
            <v-app-bar-nav-icon
                class="d-md-none d-flex"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-items>
                <v-btn x-large plain :to="{ name: 'Home' }">
                    <v-icon left>dashboard</v-icon>
                    Ad Application
                </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="d-md-flex d-none">
                <v-btn text v-for="link in links" :key="link.title" :to="link.url">
                    <v-icon left>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>
                <v-btn text v-if="isUserLoggedIn" @click="logout">
                    <v-icon left>logout</v-icon>
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <v-main>
            <transition name="fade" mode="out-in">
                <router-view class="fill-height" />
            </transition>
            <Snackbar />
        </v-main>
    </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar';

export default {
    components: {
        Snackbar,
    },
    name: 'App',
    data() {
        return {
            drawer: false,
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('logoutUser');
            if (this.$route.fullPath !== '/') this.$router.push('/');
        },
    },
    computed: {
        isUserLoggedIn() {
            return this.$store.getters.getUser;
        },
        links() {
            if (this.isUserLoggedIn) {
                return [
                    { title: 'Orders', icon: 'bookmark_border', url: '/orders' },
                    { title: 'New ad', icon: 'note_add', url: '/new-ad' },
                    { title: 'My ads', icon: 'list', url: '/ad-list' },
                ];
            } else {
                return [
                    { title: 'Login', icon: 'lock', url: '/login' },
                    { title: 'Registration', icon: 'account_box', url: '/registration' },
                ];
            }
        },
    },
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.2s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.progress-circular {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
