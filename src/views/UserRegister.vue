<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    <v-form @submit.prevent="register" ref="form" class="bordered-card pa-10">
      <v-text-field
        v-model.trim="form.companyName"
        label="Company Name*"
        :rules="companyNameRules"
        outlined
        required
      ></v-text-field>
      <v-text-field
        v-model.trim="form.logoUrl"
        label="Logo URL*"
        :rules="logoUrlRules"
        outlined
        required
      ></v-text-field>
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
      <v-btn type="submit" color="success" class="mr-2">Register</v-btn>
      <v-btn @click="$router.push('/login')" color="warning">Login</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top>{{
      snackbarText
    }}</v-snackbar>
  </v-container>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "UserRegister",
  data() {
    return {
      form: { companyName: "", logoUrl: "", email: "", password: "" },
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      companyNameRules: [(v) => !!v || "Company Name is required"],
      logoUrlRules: [
        (v) => !!v || "Logo URL is required",
        (v) => v.startsWith("http") || "Invalid image URL",
      ],
      emailRules: [
        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email",
        (v) => /.+@.+/.test(v) || "Invalid email",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Should contain minimum of 8 characters",
      ],
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.get("/users", {
            params: { email: this.form.email },
          });

          const emailExists = response.data.find(
            (user) => user.email === this.form.email
          );
          if (emailExists) {
            this.snackbarText = "Email is already registered";
            this.snackbarColor = "error";
            this.snackbar = true;
            return;
          }
          // Register new user
          await axios.post("/users", this.form);
          this.snackbarText = "Registered successfully";
          this.snackbarColor = "success";
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        } catch (error) {
          console.error(error);
          this.snackbarText = "An error occurred during registration";
          this.snackbarColor = "error";
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
