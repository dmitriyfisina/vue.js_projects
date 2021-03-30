<template>
    <v-dialog width="400px" v-model="modal">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                min-width="100px"
                color="warning"
                slot="activator"
                >Edit</v-btn
            >
        </template>
        <v-card>
            <v-card-title class="justify-space-between">
                <h4>Edit Ad</h4>
                <v-btn icon @click="onCancel">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field
                    label="Title"
                    name="title"
                    type="text"
                    v-model="editedTitle"
                ></v-text-field>
                <v-textarea
                    label="Description"
                    name="description"
                    type="text"
                    multi-line
                    v-model="editedDescription"
                ></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="onSave">Save</v-btn>
                <v-btn text color="secondary" @click="onCancel">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['ad'],
    data() {
        return {
            modal: false,
            editedTitle: this.ad.title,
            editedDescription: this.ad.description,
        };
    },
    methods: {
        onCancel() {
            this.modal = false;
            this.editedTitle = this.ad.title;
            this.editedDescription = this.ad.description;
        },
        onSave() {
            if(this.editedTitle && this.editedDescription) {
                this.$store.dispatch('updateAd', {
                    title: this.editedTitle,
                    description: this.editedDescription,
                    id: this.ad.id
                })
                this.modal = false
            }
        },
    }
};
</script>

<style lang="scss" scoped></style>
