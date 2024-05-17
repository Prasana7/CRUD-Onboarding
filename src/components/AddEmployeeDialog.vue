<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="10"
          ><h2>{{ title }}</h2></v-col
        >
        <v-col cols="2">
          <v-icon @click="closeDialog" color="red">mdi-close</v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="addEmployee" :disabled="view">
        <v-text-field
          v-model="form.name"
          label="Name*"
          :rules="nameRules"
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model="form.dob"
          label="DoB*"
          type="date"
          :rules="dobRules"
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model="form.address"
          label="Address*"
          :rules="addressRules"
          outlined
          required
        ></v-text-field>
        <v-select
          v-model="form.city"
          :items="cities"
          label="City*"
          outlined
          :rules="cityRules"
          required
        ></v-select>
        <v-text-field
          v-model="form.state"
          label="State*"
          :rules="stateRules"
          disabled
          outlined
          required
        ></v-text-field>

        <div v-for="(experience, index) in experiences" :key="index">
          <v-card class="pa-5 mb-3 purple">
            <div class="d-flex justify-start">
              <h2>Experience {{ index + 1 }}</h2>
            </div>
            <br />
            <v-text-field
              label="Company Name*"
              v-model="experience.company_name"
              outlined
              :rules="companyRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="experience.from_date"
              label="From Date*"
              type="date"
              :rules="dobRules"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="experience.to_date"
              label="To Date*"
              type="date"
              :rules="dobRules"
              outlined
              required
            ></v-text-field>
            <div class="d-flex justify-start"><h4>Position</h4></div>

            <v-radio-group v-model="experience.position" :rules="positionRules">
              <v-radio
                v-for="n in position"
                :key="n"
                :label="n"
                :value="n"
                required
              ></v-radio>
            </v-radio-group>
          </v-card>
        </div>

        <v-btn
          v-if="!view"
          block
          color="success"
          @click="addExperience"
          class="mb-4"
          >Add Experience</v-btn
        >

        <v-btn v-if="!view" type="submit" color="success" class="mr-5"
          >Submit</v-btn
        >
      </v-form>
    </v-card-text>

    <v-snackbar v-model="snackbar" :color="snackbarColor" top>{{
      snackbarText
    }}</v-snackbar>
  </v-card>
</template>

<script>
import axios from "@/plugins/axios";
import dayjs from "dayjs"; // Import dayjs for date calculations

export default {
  props: {
    edit: {
      type: Object,
    },
    view: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: { state: "Tamilnadu" },
      experiences: [
        {
          company_name: "",
          from_date: "",
          to_date: "",
          position: "",
        },
      ],
      nameRules: [(v) => !!v || "Name is required"],
      dobRules: [(v) => !!v || "DOB is required"],
      addressRules: [(v) => !!v || "Address is required"],
      stateRules: [(v) => !!v || "State is required"],
      cityRules: [(v) => !!v || "City is required"],
      companyRules: [(v) => !!v || "Company is required"],
      positionRules: [(v) => !!v || "Position is required"],
      cities: [
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Tiruchirappalli",
        "Salem",
        "Erode",
        "Tirunelveli",
        "Vellore",
        "Thoothukudi",
        "Nagercoil",
      ],
      position: ["DEV", "QA", "BA"],
      title: "Add Employee",
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
    };
  },
  methods: {
    addExperience() {
      this.experiences.push({
        company_name: "",
        from_date: "",
        to_date: "",
        position: "",
      });
    },
    calculateTotalExperience() {
      let totalYears = 0;
      this.experiences.forEach((exp) => {
        const fromDate = dayjs(exp.from_date);
        const toDate = dayjs(exp.to_date);
        if (fromDate.isValid() && toDate.isValid()) {
          totalYears += toDate.diff(fromDate, "year", true);
        }
      });
      return totalYears.toFixed(2); // Returns total years as a string with 2 decimal places
    },
    async addEmployee() {
      if (this.$refs.form.validate()) {
        // Calculate the total years of experience
        const totalExperience = this.calculateTotalExperience();

        try {
          if (this.edit.id) {
            await axios.put(`/employees/${this.edit.id}`, {
              ...this.form,
              experiences: this.experiences,
              experience: totalExperience,
            });
            this.snackbarText = "Employee updated successfully";
            this.snackbarColor = "success";
            this.snackbar = true;
          } else {
            await axios.post("/employees", {
              ...this.form,
              experiences: this.experiences,
              experience: totalExperience,
            });
            this.snackbarText = "Employee added successfully";
            this.snackbarColor = "success";
            this.snackbar = true;
          }

          // Add a slight delay before routing to the next page
          setTimeout(() => {
            this.closeDialog();
          }, 1000); // Adjust the delay time as needed
        } catch (error) {
          this.snackbarText = "Failed to save employee data";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      }
    },
    closeDialog() {
      this.$refs.form.reset();
      this.experiences = [
        {
          company_name: "",
          from_date: "",
          to_date: "",
          position: "",
        },
      ];
      this.$emit("close");
    },
  },
  async created() {
    if (this.edit.id) {
      if (this.view) {
        this.title = "Employee View";
      } else {
        this.title = "Edit Employee";
      }
      this.form = { ...this.edit };
      if (this.edit.experiences) {
        this.experiences = [...this.edit.experiences];
      }
    }
  },
};
</script>
