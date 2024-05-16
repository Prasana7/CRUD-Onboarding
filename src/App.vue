<template>
  <v-app>
    <v-app-bar app color="success" dark>
      <v-toolbar-title>
        <img :src="logoUrl" alt="Logo" height="32">
        <span v-if="companyName" class="ml-3">{{ companyName }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" @click="logout" color="white">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']),
    logoUrl() {
      return this.$store.state.user?.logoUrl || '';
    },
    companyName() {
      return this.$store.state.user?.companyName || '';
    },
  },
  methods: {
    ...mapActions(['logout']),
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
