<template>
    <v-dialog v-model="internalDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Employee</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addEmployee">
            <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>
            <v-text-field v-model="dob" label="DOB" type="date" :rules="dobRules" required></v-text-field>
            <v-text-field v-model="address" label="Address" :rules="addressRules" required></v-text-field>
            <v-select v-model="city" :items="cities" label="City" required></v-select>
            <v-text-field v-model="state" label="State" :rules="stateRules" disabled required></v-text-field>
            <v-text-field v-model="experience" label="Experience" required></v-text-field>
            <v-btn type="submit">Add</v-btn>
            <v-btn @click="closeDialog">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axios from '@/plugins/axios';
  
  export default {
    props: {
      dialog: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        internalDialog: this.dialog,
        name: '',
        dob: '',
        address: '',
        city: '',
        state: 'Tamil Nadu',
        experience: '',
        nameRules: [v => !!v || 'Name is required'],
        dobRules: [v => !!v || 'DOB is required'],
        addressRules: [v => !!v || 'Address is required'],
        stateRules: [v => !!v || 'State is required'],
        cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode', 'Tirunelveli', 'Vellore', 'Thoothukudi', 'Nagercoil'],
      };
    },
    watch: {
      dialog(val) {
        this.internalDialog = val;
      },
      internalDialog(val) {
        this.$emit('update:dialog', val);
      },
    },
    methods: {
      async addEmployee() {
        const employee = {
          name: this.name,
          dob: this.dob,
          address: this.address,
          city: this.city,
          state: this.state,
          experience: this.experience,
        };
        await axios.post('/employees', employee);
        this.closeDialog();
      },
      closeDialog() {
        this.internalDialog = false;
      },
    },
  };
  </script>
  