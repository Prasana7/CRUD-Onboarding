<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="11"></v-col>
        <v-col cols="1"
          ><v-icon @click="closeDialog" color="red">mdi-close</v-icon></v-col
        >
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="submit">
        <v-select
          v-model="form.select"
          :items="list"
          label="Select"
          outlined
          required
        ></v-select>
        <v-text-field
          v-model="form.search"
          label="Search"
          append-icon="mdi-magnify"
          outlined
          required
        ></v-text-field>
        <v-col>
          <v-btn type="submit" class="mr-5 success">Submit</v-btn>
        </v-col>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      list: ["name", "dob", "address", "city"],
      form: {},
    };
  },
  methods: {
    submit() {
      this.$emit("find", this.form);
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
