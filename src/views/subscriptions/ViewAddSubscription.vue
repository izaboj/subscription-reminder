<template>
  <base-dialog v-model="state.isError" @close="handleError">{{
    state.error
  }}</base-dialog>
  <base-dialog v-if="state.isSuccess" fixed>
    <template v-slot:title>Success</template>
    Sucess: Your subscription has been added
  </base-dialog>
  <base-card>
    <SubscriptionForm
      @error="handleError"
      @success="handleSuccess"
    ></SubscriptionForm>
  </base-card>
</template>

<script setup>
import { reactive } from "vue";
import SubscriptionForm from "@/components/subscriptions/SubscriptionForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
  error: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
});

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
