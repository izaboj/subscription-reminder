<template>
  <base-dialog v-model="error" @close="handleError"
    ><p>{{ error }}</p></base-dialog
  >
  <v-card
    color="background"
    height="20%"
    class="d-flex align-center justify-center wrap"
  >
    <v-btn color="primary">Primary</v-btn>
    <v-btn color="secondary">Secondary</v-btn>
    <v-btn color="background">Background</v-btn>
    <v-btn color="surface">Surface</v-btn>
    <v-btn color="error"> Error</v-btn>
    <v-btn color="warning"> Warning</v-btn>
    <v-btn color="info"> Info</v-btn>
    <v-btn color="success"> Success</v-btn>
  </v-card>
  <base-sheet justify="start">
    <h2 class="text-h5 mb-4 d-flex">
      <v-icon color="primary" icon="mdi-youtube-subscription"></v-icon>
      <span class="ml-3">Your subscriptions list</span>
    </h2>
    <v-expansion-panels>
      <subscription-item :item="i" v-for="i in itemsList"></subscription-item>
    </v-expansion-panels>
  </base-sheet>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useSubscriptionsStore } from "@/stores/subscriptions";
import SubscriptionItem from "@/components/subscriptions/SubscriptionItem.vue";

// data
const error = ref(null);
const isLoading = ref(false);
const subStore = useSubscriptionsStore();
const itemsList = computed(() => {
  return subStore.subscriptions;
});

loadItems();

async function loadItems() {
  isLoading.value = true;
  try {
    await subStore.getSubscriptions();
  } catch (e) {
    error.value = e.message || "error during loadingItems";
  }
  isLoading.value = false;
}

function handleError() {
  error.value = null;
}

onMounted(() => {
  console.log(`the component Subscription is now mounted.`);
});
</script>
