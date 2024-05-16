<template>
  <v-container>
    <v-form @submit.prevent="register">
      <v-text-field v-model="companyName" label="Company Name" :rules="companyNameRules" required></v-text-field>
      <v-text-field v-model="logoUrl" label="Logo URL" :rules="logoUrlRules" required></v-text-field>
      <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" required></v-text-field>
      <v-btn type="submit">Register</v-btn>
      <v-btn @click="$router.push('/login')">Login</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      companyName: '',
      logoUrl: '',
      email: '',
      password: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      companyNameRules: [v => !!v || 'Company Name is required'],
      logoUrlRules: [v => !!v || 'Logo URL is required'],
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
    async register() {
      try {
        // Check if email already exists
        const response = await axios.get('/users', {
          params: { email: this.email },
        });
        if (response.data.length > 0) {
          this.snackbarText = 'Email is already registered';
          this.snackbarColor = 'error';
          this.snackbar = true;
          return;
        }
        // Register new user
        await axios.post('/users', {
          companyName: this.companyName,
          logoUrl: this.logoUrl,
          email: this.email,
          password: this.password,
        });
        this.snackbarText = 'Registered successfully';
        this.snackbarColor = 'success';
        this.$router.push('/login');
      } catch (error) {
        this.snackbarText = 'An error occurred during registration';
        this.snackbarColor = 'error';
      } finally {
        this.snackbar = true;
      }
    },
  },
};
</script>
