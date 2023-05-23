<template>
  <v-container class="mt-4">
    <v-sheet
      elevation="1"
      max-width="600"
      rounded="sm"
      width="100%"
      class="pa-4 text-left mx-auto"
      :color="color"
    >
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
