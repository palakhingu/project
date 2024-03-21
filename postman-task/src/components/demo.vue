<template>
    <v-container class="mt-10">
        <v-row justify="center">
            <v-col cols="3">
                <v-text-field v-model="name" label="Your Name" placeholder="Enter Your Email address" type="text"
                    variant="outlined"
                    :rules="[() => !!name || 'This field is required', () => name.match(/^[a-zA-Z]+$/) || 'enter only alphabates']"
                    class="mb-3"></v-text-field>
                <v-text-field label="Password" placeholder="Enter Your Password" type="password" variant="outlined"
                    persistent-counter></v-text-field>
                <v-btn rounded="lg" size="small" elevation="4" type="submit" color="dark" class="text-white">
                    submit</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {

            name: "",
        };
    },
};
</script>
