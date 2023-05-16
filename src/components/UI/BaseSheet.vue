<template>
  <v-container class="mt-4">
    <v-sheet
      elevation="10"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
      :color="color"
    >
      <h2 class="text-h5 mb-6">{{ title }}</h2>
      <slot></slot>
    </v-sheet>
  </v-container>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
});
</script>
