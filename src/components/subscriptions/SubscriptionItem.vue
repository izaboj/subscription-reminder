<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="d-flex">
      <v-row no-gutters>
        <v-col
          cols="9"
          class="text-primary font-weight-medium d-flex align-center"
        >
          {{ item.name }}
        </v-col>
        <v-col cols="3" class="text-body-2 d-flex align-center">
          {{ item.dueTo }}
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row no-gutters class="d-flex flex-column align-center mb-4">
        <v-col class="font-weight-medium"> Price </v-col>
        <v-col class="text-body-2">
          {{ item.price }}
        </v-col>
      </v-row>
      <v-row no-gutters class="d-flex flex-column align-center mb-4">
        <v-col class="font-weight-medium"> Expiration Date </v-col>
        <v-col class="text-body-2">
          {{ item.dueTo }}
        </v-col>
      </v-row>
      <v-row no-gutters class="d-flex flex-column align-start mb-4">
        <v-col class="font-weight-medium"> More Info </v-col>
        <v-col class="text-body-2">
          <!-- {{ item.link }} -->
          <a href="www.google.pl">google.pl</a>
        </v-col>
      </v-row>
      <v-btn color="secondary">Edit</v-btn>
      <v-btn class="ml-12" text>delete</v-btn>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
