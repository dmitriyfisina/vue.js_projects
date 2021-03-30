<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="blue" dark flat>
                        <v-toolbar-title>Registration form</v-toolbar-title>
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
                                :append-icon="showPawwsord ? 'mdi-eye' : 'mdi-eye-off'"
                                v-model="password"
                                :type="!showPawwsord ? 'password' : 'text'"
                                :rules="passwordRules"
                                @click:append="showPawwsord = !showPawwsord"
                            ></v-text-field>

                            <v-text-field
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                prepend-icon="mdi-lock"
                                :type="!showConfirmPawwsord ? 'password' : 'text'"
                                :rules="confirmPasswordRules"
                                :append-icon="showConfirmPawwsord ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showConfirmPawwsord = !showConfirmPawwsord"
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
                            >Create Account</v-btn
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
            showConfirmPawwsord: false,
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => (v || '').length >= 6 || 'Password shoud be equal or more 6 characters',
            ],
            confirmPasswordRules: [
                (v) => !!v || 'Password is required',
                (v) => v === this.password || 'Password shoud mutch',
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
                    .dispatch('registerUser', user)
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
};
</script>
