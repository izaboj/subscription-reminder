<template>
  <base-card>
    <form class="pa-5 ma-5" @submit.prevent="submitForm">
      <v-text-field
        class="mb-3"
        v-model.trim="state.form.email"
        :error-messages="v$.email.$errors.map((e) => e.$message)"
        label="E-mail"
        type="text"
        required
        @input="v$.email.$touch"
        @blur="v$.email.$touch"
      ></v-text-field>
      <v-text-field
        class="mb-3"
        v-model.trim="state.form.password"
        :error-messages="v$.password.$errors.map((e) => e.$message)"
        label="Password"
        type="password"
        required
        @input="v$.password.$touch"
        @blur="v$.password.$touch"
      ></v-text-field>
      <div>
        <v-btn type="submit" class="me-4" @click="">
          {{ loginSignupButtonText }}</v-btn
        >
        <v-btn variant="text" @click="switchMode">
          {{ switchModeButtonText }}
        </v-btn>
      </div>
    </form>
  </base-card>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import router from "../../router";

const state = reactive({
  form: {
    email: "",
    password: "",
  },
  mode: "login",
});

// validation
const rules = {
  password: { required, minLength: minLength(3) },
  email: { required, email },
};

const v$ = useVuelidate(rules, state.form);

const switchModeButtonText = computed(() => {
  if (state.mode === "login") {
    return "sign-up";
  } else {
    return "login";
  }
});
const loginSignupButtonText = computed(() => {
  if (state.mode === "login") {
    return "login";
  } else {
    return "sign-up";
  }
});

function switchMode() {
  if (state.mode === "login") {
    state.mode = "sign-up";
  } else {
    state.mode = "login";
  }
}

async function submitForm() {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  } else {
    router.push("/subscriptions");
  }
}
</script>
