<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="blue" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                label="Email"
                                name="email"
                                prepend-icon="mdi-account"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                            ></v-text-field>

                            <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                v-model="password"
                                :rules="passwordRules"
                                :append-icon="showPawwsord ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="!showPawwsord ? 'password' : 'text'"
                                @click:append="showPawwsord = !showPawwsord"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            type="submit"
                            @click="onSubmit"
                            :loading="loading"
                            :disabled="!valid || loading"
                            color="primary"
                            >Sign in</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            showPawwsord: false,
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => (v || '').length >= 6 || 'Password shoud be equal or more 6 characters',
            ],
        };
    },
    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password,
                };

                this.$store
                    .dispatch('loginUser', user)
                    .then(() => this.$router.push('/'))
                    .catch((error) => console.error(error));
            }
        },
    },
    computed: {
        loading() {
            return this.$store.getters.getLoading;
        },
    },
    created() {
        if(this.$route.query['loginError']) {
            this.$store.dispatch('setError', 'Please log in to access this page!')
        }
    }
};
</script>
