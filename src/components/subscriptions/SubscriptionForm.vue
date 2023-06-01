<template>
  <form @submit.prevent="submitForm">
    <v-select
      class="mb-3"
      v-model="state.form.name"
      :items="state.availableSubscriptions"
      item-value="text"
      item-title="text"
      label="Subscription Name"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      @change="v$.name.$touch"
      @blur="v$.name.$touch"
    >
      <template v-slot:item="{ item, index, props }">
        <v-list-item v-bind="props">
          <v-list-item-title>
            <v-row>
              {{ item.title }}
            </v-row>
          </v-list-item-title>
          <template v-slot:prepend>
            <v-icon :icon="item.raw.icon"></v-icon>
          </template>
        </v-list-item>
      </template>
    </v-select>
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
      class="mb-3"
      v-model="state.form.reminder"
      hide-details
      true-value="yes"
      false-value="no"
      label="Reminder"
    ></v-switch>
    <div>
      <v-btn
        :disabled="!state.isValidated"
        :loading="state.isLoading"
        type="submit"
        class="mr-4"
        color="primary"
      >
        {{ buttonName }}</v-btn
      >
      <v-btn variant="text" color="secondary" @click="cancelAction">
        cancel
      </v-btn>
    </div>
  </form>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useSubscriptionsStore } from "@/stores/subscriptions";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

//props + emit
const emit = defineEmits(["error", "success", "close"]);
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  id: { type: String, required: false },
});

const buttonName = computed(() => {
  return props.type === "edit" ? "update" : "add";
});

//data
const state = reactive({
  form: {
    name: null,
    price: null,
    reminder: true,
    dueTo: null,
  },
  availableSubscriptions: [
    { text: "YouTube", icon: "mdi-youtube" },
    { text: "Spotify", icon: "mdi-spotify" },
    { text: "Netflix", icon: "mdi-netflix" },
    { text: "Microsoft", icon: "mdi-microsoft" },
    { text: "Adobe", icon: "mdi-adobe" },
  ],
  isLoading: false,
  isValidated: true,
});

// validation
const rules = {
  name: { required },
  price: { required },
  dueTo: { required, minLength: minLength(10) },
  reminder: { required },
};

const v$ = useVuelidate(rules, state.form);
const router = useRouter();
const store = useSubscriptionsStore();

const getSubscriptionDataToEdit = () => {
  if (!props.id) {
    return;
  } else {
    const filtered = store.subscriptions.filter((item) => item.id === props.id);
    console.log(filtered);
  }
};

const submitForm = async () => {
  state.isValidated = await v$.value.$validate();
  if (!state.isValidated) {
    state.isValidated = true;
    return;
  } else {
    state.isLoading = true;
    const item = { ...state.form };
    try {
      await store.addSubscription(item);
      emit("success", item);
    } catch (e) {
      emit("error", e);
    }
  }
  state.isLoading = false;
  state.isValidated = true;
};
const cancelAction = () => {
  router.replace("/subscriptions");
  emit("close");
};
getSubscriptionDataToEdit();
</script>
