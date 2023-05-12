import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";

export const useSubscriptionsStore = defineStore("subscriptions", {
  state: () => ({
    lastFetch: null,
    subscriptions: [],
    firebaseEndpoint:
      "https://subscription-reminder-5d2a3-default-rtdb.firebaseio.com/",
  }),
  getters: {},
  actions: {
    setSubcriptions(payload) {
      this.subscriptions = payload;
    },
    addSubscription(item) {
      this.subscriptions.push(item);
    },
    async getSubscriptions() {
      const authStore = useAuthStore();
      const userId = 1;
      const tokenId = authStore.userToken;
      const url =
        this.firebaseEndpoint + `/subscriptions/${userId}.json?auth=` + tokenId;

      const response = await fetch(url, {
        method: "GET",
      });

      const responseData = await response.json();
      console.log(responseData);

      const mappedData = [];
      for (const key in responseData) {
        const item = {
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          dueTo: responseData[key].dueTo,
          reminder: responseData[key].reminder,
        };
        mappedData.push(item);
      }

      this.setSubcriptions(mappedData);
    },
  },
});

// subscriptions = [
//   {
//     id: 12,
//     name: "tv sub",
//     price: "30 zl",
//     dueTo: "2025-12-12",
//     reminder: true,
//   },
//   {
//     id: 13,
//     name: "youtube",
//     price: "30 zl",
//     dueTo: "2024-12-12",
//     reminder: false,
//   },
// ];
