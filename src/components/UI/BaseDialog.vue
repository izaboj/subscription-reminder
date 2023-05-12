<template>
  <v-dialog v-model="dialog" width="400" min-height="100">
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions v-if="!fixed">
        <v-btn color="primary" block @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false,
    required: false,
  },
});
const dialog = ref(true);
</script>
