<template>
     <v-container>
  
        <v-img
       height="100"
            src="../assets/logo.png"
         contain
          />
    
      <v-form ref="form" >

       <v-text-field
       label="Email">
       </v-text-field>

   
      <v-text-field
       label="Password">
       </v-text-field>      

      <v-btn
          block
          large
          depressed
          color="success"
          @click="userLogin"
          >Login
         </v-btn>
<div class="d-flex justify-center">Register</div>
      </v-form>

    </v-container>
</template>

<script>
  export default {
    name: 'LogIn',
    data: () => ({}),
  }
</script>

<style scoped>

/* .form{
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>