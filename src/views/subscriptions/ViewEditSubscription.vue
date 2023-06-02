<template>
  <base-dialog v-model="state.isError" @close="handleError">{{
    state.error
  }}</base-dialog>
  <base-dialog v-if="state.isSuccess" fixed>
    <template v-slot:title>Success</template>
    Your subscription has been updated successfully
  </base-dialog>
  <base-card>
    <subscription-form
      type="edit"
      :id="id"
      @error="handleError"
      @success="handleSuccess"
    ></subscription-form>
  </base-card>
</template>

<script setup>
import { reactive } from "vue";
import SubscriptionForm from "@/components/subscriptions/SubscriptionForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// data
const state = reactive({
  error: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const id = this.$route.params.id;

//methods
const handleError = (error) => {
  state.error = error ? error : null;
  state.isError = error ? true : false;
  router.replace("/subscriptions");
};
const handleSuccess = () => {
  state.isSuccess = true;
  router.replace("/subscriptions");
};
</script>
