<template>
  <form class="pa-5 ma-5" @submit.prevent="submitForm">
    <v-text-field
      class="mb-3"
      v-model.trim="state.form.name"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      label="Name"
      type="text"
      required
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    ></v-text-field>
    <v-text-field
      class="mb-3"
      v-model.trim="state.form.price"
      :error-messages="v$.price.$errors.map((e) => e.$message)"
      label="Price"
      type="text"
      @input="v$.price.$touch"
      @blur="v$.price.$touch"
    ></v-text-field>
    <v-text-field
      class="mb-3"
      v-model.trim="state.form.dueTo"
      :error-messages="v$.dueTo.$errors.map((e) => e.$message)"
      label="Due To Date"
      type="date"
      @input="v$.dueTo.$touch"
      @blur="v$.dueTo.$touch"
    ></v-text-field>
    <v-switch
      v-model="state.form.reminder"
      hide-details
      true-value="yes"
      false-value="no"
      label="Reminder"
    ></v-switch>
    <div>
      <v-btn type="submit" class="me-4"> add</v-btn>
      <v-btn variant="text" @click="cancelAction"> cancel </v-btn>
    </div>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useSubscriptionsStore } from "@/stores/subscriptions";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const emit = defineEmits(["error"]);

const state = reactive({
  form: {
    name: "",
    price: null,
    reminder: true,
    dueTo: null,
  },
});

// validation
const rules = {
  name: { required, minLength: minLength(3) },
  price: {},
  dueTo: { required, minLength: minLength(10) },
  reminder: { required },
};

const v$ = useVuelidate(rules, state.form);
const router = useRouter();

const submitForm = async () => {
  const store = useSubscriptionsStore();
  const isValidated = await v$.value.$validate();
  if (!isValidated) {
    return;
  } else {
    const item = { ...state.form };
    try {
      // await store.addSubscription(item);
      throw new Error("test");
    } catch (e) {
      // state.error = e.message || "can not get data";
      // state.isError = true;
      emit("error", e);
    }
    // router.replace("/subscriptions/");
  }
};
const cancelAction = () => {
  router.replace("/subscriptions");
};
</script>
