<template>
  <v-container class="mt-4">
    <v-sheet
      elevation="1"
      rounded="sm"
      width="100%"
      class="pa-4 text-left mx-auto"
      color="grey-lighten-3"
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
