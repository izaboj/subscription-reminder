<template>
  <base-dialog v-model="error" @close="handleError"
    ><p>{{ error }}</p></base-dialog
  >
  <base-sheet title="Your subscriptions list">
    <!-- <div v-if="isLoading">
      Data is loading
      <v-progress-linear
        indeterminate
        color="primary"
        class="mb-0"
      ></v-progress-linear>
    </div> -->

    <v-card :loading="isLoading" class="mb-4 outlined" v-for="i in itemsList">
      <v-card-item>
        <v-card-title>{{ i.name }}</v-card-title>
        <v-card-subtitle>{{ i.dueTo }}</v-card-subtitle>
      </v-card-item>
      <v-card-text
        ><p>Reminder: {{ i.reminder }}</p>
        <p>Price: {{ i.price }}</p>
      </v-card-text>
    </v-card>
  </base-sheet>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useSubscriptionsStore } from "@/stores/subscriptions";

// data
const error = ref(null);
const isLoading = ref(false);
const subStore = useSubscriptionsStore();

loadItems();

const itemsList = computed(() => {
  return subStore.subscriptions;
});

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
