<template>
  <v-container class="login">
    <v-row class="text-center ">
      <v-col class="mb-4">
       <v-text-field
       label="Username*">
       </v-text-field>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
      <v-text-field
       label="Password*">
       </v-text-field>      
      </v-col>

      <v-btn
          block
          large
          depressed
          class="red_btn white--text login"
          @click="userLogin"
          :disabled="buttonLoadingSubmit"
          ><span v-if="!buttonLoadingSubmit">Login</span>
          <span v-else class="button_submit_loading"></span
        ></v-btn>
<span >Register</span>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'LogIn',
    data: () => ({}),
  }
</script>

<style scoped>
.login {
  /* margin-top: 100px;
  margin-left: 56px;
  margin-bottom: 40px; */
  min-height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-left: 40px;
}
</style>