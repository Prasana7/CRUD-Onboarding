<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" required></v-text-field>
      <v-btn type="submit">Login</v-btn>
      <v-btn @click="$router.push('/register')">Register</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';
import { mapActions } from 'vuex';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Invalid email',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Should contain minimum of 8 characters',
      ],
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        // Fetch users and check credentials
        const response = await axios.get('/users', {
          params: { email: this.email }
        });
        
        const user = response.data.find(user => user.email === this.email && user.password === this.password);

        if (user) {
          this.snackbarText = 'Login successful';
          this.snackbarColor = 'success';
          this.login(user); // Commit user data to the store
          this.$router.push('/'); // Redirect to home or dashboard
        } else {
          this.snackbarText = 'Invalid email or password';
          this.snackbarColor = 'error';
        }
      } catch (error) {
        this.snackbarText = 'An error occurred during login';
        this.snackbarColor = 'error';
      } finally {
        this.snackbar = true;
      }
    },
  },
};
</script>
