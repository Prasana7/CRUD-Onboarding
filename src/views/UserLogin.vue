<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    <v-form @submit.prevent="loginBtn" ref="form" class="bordered-card pa-10">
      <v-text-field
        v-model.trim="form.email"
        label="Email*"
        :rules="emailRules"
        outlined
        required
      ></v-text-field>
      <v-text-field
        v-model.trim="form.password"
        label="Password*"
        type="password"
        :rules="passwordRules"
        outlined
        required
      ></v-text-field>
      <v-btn type="submit" color="success" class="mr-2">login</v-btn>
      <v-btn @click="$router.push('/register')" color="warning">Register</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top>{{
      snackbarText
    }}</v-snackbar>
  </v-container>
</template>

<script>
import axios from "@/plugins/axios";
import { mapActions } from "vuex";

export default {
  name: "UserLogin",
  data() {
    return {
      form: {},
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "Invalid email",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Should contain minimum of 8 characters",
      ],
    };
  },
  methods: {
    ...mapActions(["login"]),
    async loginBtn() {
      if (this.$refs.form.validate()) {
        try {
          // Fetch users and check credentials
          const response = await axios.get("/users", {
            params: { email: this.form.email },
          });

          const user = response.data.find(
            (user) =>
              user.email === this.form.email &&
              user.password === this.form.password
          );

          if (user) {
            this.snackbarText = "Login successful";
            this.snackbarColor = "success";
            this.login(user); // Commit user data to the store
            setTimeout(() => {
              this.$router.push("/home"); // Redirect to home
            }, 1000);
          } else {
            this.snackbarText = "Invalid email or password";
            this.snackbarColor = "error";
          }
        } catch (error) {
          this.snackbarText = "An error occurred during login";
          this.snackbarColor = "error";
        } finally {
          this.snackbar = true;
        }
      }
    },
  },
};
</script>
<style scoped>
.fill-height {
  height: 100vh;
}
.bordered-card {
  border-radius: 8px;
  border: 3px solid;
}
</style>
