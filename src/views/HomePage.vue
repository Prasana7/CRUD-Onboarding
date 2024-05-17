<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-start">
        <h2>Employee List</h2>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn @click="openAddEmployeeDialog" color="success"
          >Add Employee</v-btn
        >
        <v-btn @click="openSearchDialog = true" color="warning" class="mx-5"
          >Search</v-btn
        >
        <v-btn @click="filter = {}" color="error"
          >Clear<v-icon class="ml-1">mdi-filter-remove</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <br />
    <v-sheet outlined>
      <v-data-table
        :headers="headers"
        :items="filteredEmployees"
        class="elevation-1"
        hide-default-footer
        :search="tableSearch"
      >
        <template v-slot:[`item.action`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="warning">
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(item), (disableForm = true)"
            color="blue"
          >
            mdi-eye
          </v-icon>

          <v-icon small @click="deleteItem(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data> No data available </template>
      </v-data-table>
    </v-sheet>
    <v-dialog v-model="addEmployeeDialog" persistent max-width="800px">
      <add-employee-dialog
        v-if="addEmployeeDialog"
        :edit="employee"
        :view="disableForm"
        @close="closeAddEmployeeDialog"
      ></add-employee-dialog>
    </v-dialog>
    <v-dialog v-model="openSearchDialog" persistent max-width="600px">
      <search-dialog
        v-if="openSearchDialog"
        @close="openSearchDialog = false"
        @find="findEmployee"
      ></search-dialog>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top>{{
      snackbarText
    }}</v-snackbar>
  </v-container>
</template>

<script>
import axios from "@/plugins/axios";
import AddEmployeeDialog from "@/components/AddEmployeeDialog.vue";
import searchDialog from "@/components/searchDialog.vue";

import { mapActions } from "vuex";

export default {
  components: {
    AddEmployeeDialog,
    searchDialog,
  },
  data() {
    return {
      addEmployeeDialog: false,
      openSearchDialog: false,
      disableForm: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "DoB", value: "dob" },
        { text: "Address", value: "address" },
        { text: "City", value: "city" },
        { text: "State", value: "state" },
        { text: "Experience (in years)", value: "experience" },
        { text: "Action", value: "action" },
      ],
      employees: [],
      employee: {},
      tableSearch: "",
      filter: {},
    };
  },
  computed: {
    filteredEmployees() {
      return !this.filter?.search
        ? this.employees
        : this.employees.filter((emp) =>
            emp[this.filter?.select]
              .toLowerCase()
              .includes(this.filter?.search.toLowerCase())
          );
    },
  },
  methods: {
    ...mapActions(["logout"]),
    async fetchEmployees() {
      const response = await axios.get("/employees");
      this.employees = response.data;
    },
    openAddEmployeeDialog() {
      this.addEmployeeDialog = true;
    },
    findEmployee(item) {
      this.filter = item;
      this.openSearchDialog = false;
    },
    closeAddEmployeeDialog() {
      this.addEmployeeDialog = false;
      this.disableForm = false;
      this.employee = {};
      this.fetchEmployees();
    },
    editItem(item) {
      this.employee = item;
      this.addEmployeeDialog = true;
    },
    async deleteItem(item) {
      try {
        await axios.delete(`/employees/${item.id}`);
        this.fetchEmployees();
        this.snackbarText = "Employee deleted successfully";
        this.snackbarColor = "error";
        this.snackbar = true;
      } catch (error) {
        this.snackbarText = "Failed to delete employee";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
  },
  created() {
    this.fetchEmployees();
  },
};
</script>
