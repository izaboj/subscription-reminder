<template>
  <base-dialog
    v-model="state.dialog"
    title="Deleting"
    type="action"
    @confirm="deleteItem(item.id)"
    @close="state.dialog = !state.dialog"
    >Are you sure you want to delete this subscription?</base-dialog
  >
  <v-expansion-panel>
    <v-expansion-panel-title class="d-flex">
      <v-row no-gutters class="d-flex justify-space-between">
        <v-col
          class="text-primary font-weight-medium d-flex align-center justify-start"
        >
          {{ item.name }}
        </v-col>
        <v-col class="text-body-2 d-flex align-center justify-end">
          {{ item.dueTo }}
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row no-gutters class="d-flex flex-column align-center mb-4">
        <v-col class="font-weight-medium"> Price </v-col>
        <v-col class="text-body-2">
          {{ item.price }}
        </v-col>
      </v-row>
      <v-row no-gutters class="d-flex flex-column align-center mb-4">
        <v-col class="font-weight-medium"> Expiration Date </v-col>
        <v-col class="text-body-2">
          {{ item.dueTo }}
        </v-col>
      </v-row>
      <v-row no-gutters class="d-flex flex-column align-start mb-4">
        <v-col class="font-weight-medium"> More Info </v-col>
        <v-col class="text-body-2">
          <!-- {{ item.link }} -->
          <a href="www.google.pl">google.pl</a>
        </v-col>
      </v-row>
      <v-btn color="secondary">Edit</v-btn>
      <v-btn class="ml-12" text @click="state.dialog = !state.dialog"
        >delete</v-btn
      >
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup>
import { reactive } from "vue";
import { useSubscriptionsStore } from "@/stores/subscriptions";

// emit
const emit = defineEmits(["error"]);

// props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

//store
const subStore = useSubscriptionsStore();

//state
const state = reactive({
  dialog: false,
});

const deleteItem = async (id) => {
  try {
    await subStore.deleteSubscription(id);
  } catch (e) {
    const error = e.message || "error during deleting item";
    emit("error", error);
  }
};
</script>
