<template>
  <v-dialog v-model="dialog" width="400" min-height="100" persistent>
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions v-if="isActionDialog">
        <v-btn color="primary" @click="$emit('confirm')">yes</v-btn>
        <v-btn color="secondary" @click="$emit('close')">no</v-btn>
      </v-card-actions>
      <v-card-actions v-else-if="!fixed">
        <v-btn color="secondary" block @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, computed } from "vue";
// props
const props = defineProps({
  fixed: {
    type: Boolean,
    default: false,
    required: false,
  },
  title: {
    type: String,
    default: "",
    required: false,
  },
  type: {
    type: String,
    default: "info",
    requires: false,
  },
});

const isActionDialog = computed(() => {
  if (!props.fixed && props.type === "info") {
    return false;
  } else if (!props.fixed && props.type === "action") {
    return true;
  } else {
    return false;
  }
});

// state
const dialog = ref(true);

const cardAction = () => {};
</script>
