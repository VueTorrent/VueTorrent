<template>
    <v-layout row wrap align-center class="justify-center">
        <div style="margin: 130px auto">
            <v-container class="grey lighten-4 pa-0">
                <v-card max-width="400" flat>
                    <v-container :class="`pa-3 project done`">
                        <v-card-title class="justify-center">
                            <h2>Login</h2>
                        </v-card-title>
                        <div class="mr-5 ml-5"></div>
                        <v-card-text>
                            <v-form class="px-3" ref="form">
                                <v-text-field
                                    flat
                                    solo
                                    background-color="torrent"
                                    label="username"
                                    prepend-icon="person"
                                    v-model="username"
                                    :rules="inputRules"
                                    @keyup.enter.native="Login"
                                    autocomplete="current email"
                                    name="username"
                                ></v-text-field>
                                <v-text-field
                                    flat
                                    solo
                                    background-color="torrent"
                                    type="password"
                                    label="password"
                                    prepend-icon="lock"
                                    v-model="password"
                                    :rules="inputRules"
                                    @keyup.enter.native="Login"
                                    autocomplete="current password"
                                    name="password"
                                ></v-text-field>
                                <v-spacer></v-spacer>
                                <v-card-actions class="justify-center">
                                    <v-btn
                                        text
                                        @click="Login"
                                        class="blue_accent white--text mx-0 mt-3"
                                        >Login</v-btn
                                    >
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-container>
                </v-card>
            </v-container>
        </div>
    </v-layout>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            inputRules: [v => v.length >= 1 || 'At least 1 character']
        }
    },
    methods: {
        async Login() {
            const authenticated = await this.$store.dispatch('LOGIN', {
                username: this.username,
                password: this.password
            })

            if (authenticated) {
                this.$router.push('/')
            }
        }
    }
}
</script>
