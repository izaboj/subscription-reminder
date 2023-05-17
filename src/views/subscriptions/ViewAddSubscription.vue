<template>
  <base-dialog v-model="state.isError" @close="handleError">{{
    state.error
  }}</base-dialog>

  <base-card>
    <SubscriptionForm @error="handleError"></SubscriptionForm>
  </base-card>
</template>

<script setup>
import { reactive } from "vue";
import SubscriptionForm from "../../components/subscriptions/SubscriptionForm.vue";

const state = reactive({
  error: null,
  isLoading: false,
  isError: false,
});

const handleError = (error) => {
  state.error = error ? error : null;
  state.isError = error ? true : false;
};
</script>
