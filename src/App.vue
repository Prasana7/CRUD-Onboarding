<template>
  <v-app>
    <v-app-bar app color="#006D5B" dark v-if="user">
      <v-toolbar-title>
        <img :src="logoUrl" alt="Logo" height="40" />
        <span v-if="companyName" class="ml-3 text-h4 text-uppercase">{{
          companyName
        }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="mr-5" @click="toHome">mdi-home-circle</v-icon>
      <v-icon @click="logoutDialog = true">mdi-logout</v-icon>
    </v-app-bar>
    <v-dialog v-model="logoutDialog" persistent max-width="400">
      <v-card style="border-radius: 8px" class="pa-4" color="bg">
        <v-card-title>
          <div class="text-h5 text-center">Do you wish to Logout ?</div>
        </v-card-title>
        <v-card-actions class="d-flex justify-center">
          <v-btn class="white--text px-8" color="success" @click="logoutBtn"
            >Yes</v-btn
          >
          <v-btn
            class="white--text px-8"
            color="error"
            @click="logoutDialog = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      logoutDialog: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    logoUrl() {
      return this.$store.state.user?.logoUrl || "";
    },
    companyName() {
      return this.$store.state.user?.companyName || "";
    },
  },
  methods: {
    ...mapActions(["logout"]),
    toHome() {
      if (this.$router.history.current.fullPath !== "/home")
        this.$router.push("/home");
    },
    logoutBtn() {
      this.logout();
      this.$router.push("/login");
      this.logoutDialog = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
