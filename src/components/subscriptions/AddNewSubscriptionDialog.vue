<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card class="py-3">
        <v-card-title class="text-h5">
          <span>Add Subscription</span>
        </v-card-title>
        <v-card-text>
          <subscription-form
            type="add"
            @error="handleError"
            @success="handleSuccess"
            @close="dialog = false"
          ></subscription-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { computed } from "vue";
import subscriptionForm from "@/components/subscriptions/SubscriptionForm.vue";

// props + emit
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "error"]);

// data
const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const handleError = (e) => {
  console.log("handleError");
  emit("error", e);
};

const handleSuccess = () => {
  dialog.value = false;
};
</script>
