<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="openAddEmployeeDialog">Add Employee</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="employees" class="elevation-1" hide-default-footer>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Employee List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="logout">Logout</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:no-data>
          No data available
        </template>
      </v-data-table>
      <add-employee-dialog :dialog="addEmployeeDialog" @close="closeAddEmployeeDialog"></add-employee-dialog>
      <v-snackbar v-model="snackbar" :color="snackbarColor">{{ snackbarText }}</v-snackbar>
    </v-container>
  </template>
  
  <script>
  import axios from '@/plugins/axios';
  import AddEmployeeDialog from '@/components/AddEmployeeDialog.vue';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    components: {
      AddEmployeeDialog,
    },
    data() {
      return {
        addEmployeeDialog: false,
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'DOB', value: 'dob' },
          { text: 'Address', value: 'address' },
          { text: 'City', value: 'city' },
          { text: 'State', value: 'state' },
          { text: 'Experience', value: 'experience' },
        ],
        employees: [],
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    methods: {
      ...mapActions(['logout']),
      async fetchEmployees() {
        const response = await axios.get('/employees');
        this.employees = response.data;
      },
      openAddEmployeeDialog() {
        this.addEmployeeDialog = true;
      },
      closeAddEmployeeDialog() {
        this.addEmployeeDialog = false;
        this.fetchEmployees();
      },
    },
    created() {
      // if (!this.isAuthenticated) {
      //   this.$router.push('/login');
      // }
      this.fetchEmployees();
    },
  };
  </script>
  