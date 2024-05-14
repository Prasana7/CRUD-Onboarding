<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > 

    
    </v-app-bar>

    <v-main>
      <LogIn/>
    </v-main>
  </v-app>
</template>

<script>
import LogIn from './components/Login';

export default {
  name: 'App',

  components: {
    LogIn,
  },

  data: () => ({
    //
  }),
};
</script>
