<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                    <h1 class="text--secondary">Create new ad</h1>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                            label="Title"
                            name="title"
                            type="text"
                            v-model="title"
                            :rules="rules.required"
                        ></v-text-field>

                        <v-textarea
                            label="Description"
                            name="description"
                            v-model="description"
                            :rules="rules.required"
                        ></v-textarea>
                    </v-form>
                    <v-card
                        elevation="0"
                        color="d-flex flex-wrap justify-space-between align-center"
                    >
                        <v-switch v-model="promo" label="Add to promo?"></v-switch>
                        <v-btn color="blue-grey" class="white--text" @click="triggerUpload">
                            Upload preview
                            <v-icon right dark>
                                mdi-cloud-upload
                            </v-icon>
                        </v-btn>
                        <input
                            @change="onFileChange"
                            ref="fileInput"
                            type="file"
                            class="d-none"
                            accept="image/*"
                        />
                    </v-card>
                    <v-card class="my-3" v-if="image" elevation="0">
                       <v-img max-height="250" :src="imageSrc"></v-img>
                    </v-card>
                    <v-btn
                        type="submit"
                        :disabled="(!valid || !image) || loading"
                        :loading="loading"
                        @click="createAd"
                        block
                        color="primary"
                        >Create ad</v-btn
                    >
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'NewAd',
    data() {
        return {
            title: '',
            description: '',
            promo: false,
            valid: false,
            rules: {
                required: [(v) => !!v || 'This field is required'],
            },
            imageSrc: '',
            image: null,
        };
    },
    methods: {
        createAd() {
            if (this.$refs.form.validate() && this.image) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    image: this.image
                };
                this.$store
                    .dispatch('createAd', ad)
                    .then(() => this.$router.push('/ad-list'))
                    .catch((error) => console.error(error));
            }
        },
        triggerUpload() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                this.imageSrc = reader.result;
            };

            reader.readAsDataURL(file);
            this.image = file;
        },
    },
    computed: {
        loading() {
            return this.$store.getters.getLoading;
        },
    },
};
</script>
