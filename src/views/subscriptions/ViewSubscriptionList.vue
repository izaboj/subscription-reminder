<template>
  <base-dialog v-model="hasError" title="Error" @close="handleError">{{
    error
  }}</base-dialog>
  <add-new-subscription-dialog v-model="dialog"></add-new-subscription-dialog>
  <base-sheet justify="start">
    <h2 class="text-h5 mb-4">
      <v-icon color="primary" icon="mdi-youtube-subscription"></v-icon>
      <span class="ml-3">Your subscriptions list</span>
    </h2>
    <div class="d-flex justify-space-between align-start">
      <v-text-field
        label="Search"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        single-line
      ></v-text-field>
      <v-btn
        class="ml-4"
        prepend-icon="mdi-plus"
        color="primary"
        @click="activeDialog"
        >add new</v-btn
      >
    </div>
    <v-expansion-panels v-if="hasSubscriptions">
      <subscription-item
        v-for="i in subStore.subscriptions"
        :item="i"
        :key="i.id"
        @error="handleError"
      ></subscription-item>
    </v-expansion-panels>
    <div v-else>No subscription found</div>
  </base-sheet>
  <v-card
    color="background"
    height="10%"
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
</template>
<script setup>
import { ref, computed } from "vue";
import { useSubscriptionsStore } from "@/stores/subscriptions";
import SubscriptionItem from "@/components/subscriptions/SubscriptionItem.vue";
import AddNewSubscriptionDialog from "@/components/subscriptions/AddNewSubscriptionDialog.vue";

//store
const subStore = useSubscriptionsStore();

// data
const error = ref(null);
const hasError = ref(false);
const isLoading = ref(false);
const dialog = ref(false);

const hasSubscriptions = computed(() => {
  return subStore.hasSubscriptions;
});

const loadItems = async () => {
  isLoading.value = true;
  try {
    await subStore.getSubscriptions();
  } catch (e) {
    error.value = e.message || "error during loadingItems";
    hasError.value = true;
  }
  isLoading.value = false;
};
const activeDialog = () => {
  console.log("active dialog");
  dialog.value = true;
};
const handleError = (e) => {
  error.value = e ? e : null;
  hasError.value = e ? true : false;
};
loadItems();
</script>
