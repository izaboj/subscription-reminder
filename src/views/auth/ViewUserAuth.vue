<template>
  <div>
    <base-dialog v-model="state.isLoading" fixed
      >Authorisation is going
      <v-progress-linear
        indeterminate
        color="primary"
        class="mb-0"
      ></v-progress-linear
    ></base-dialog>
    <base-dialog v-model="state.isError" @close="handleError">{{
      state.error
    }}</base-dialog>

    <base-card>
      <form class="ma-5" @submit.prevent="submitForm">
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
          <v-btn type="submit" class="me-4" color="primary" @click="">
            {{ loginSignupButtonText }}</v-btn
          >
          <v-btn variant="text" color="primary" @click="switchMode">
            {{ switchModeButtonText }}
          </v-btn>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const store = useAuthStore();
const state = reactive({
  form: {
    email: "",
    password: "",
  },
  mode: "login",
  error: null,
  isLoading: false,
  isError: false,
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
function handleError() {
  state.error = null;
  state.isError = false;
}
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
    const payload = {
      email: state.form.email,
      password: state.form.password,
    };

    try {
      if (state.mode === "login") {
        state.isLoading = true;
        await store.login(payload, "login");
      } else {
        await store.signup(payload, "signup");
      }
    } catch (e) {
      state.isError = true;
      state.error = e.message || "An error occurred while login";
      router.replace("/auth");
    }
    state.isLoading = false;
  }
}
</script>
