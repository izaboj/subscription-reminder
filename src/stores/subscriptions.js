import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";

export const useSubscriptionsStore = defineStore("subscriptions", {
  state: () => ({
    lastFetch: null,
    subscriptions: [],
    firebaseEndpoint:
      "https://subscription-reminder-5d2a3-default-rtdb.firebaseio.com/",
  }),
  getters: {
    hasSubscriptions(state) {
      return state.subscriptions && state.subscriptions.length > 0;
    },
  },
  actions: {
    async getSubscriptions() {
      const authStore = useAuthStore();
      const userId = authStore.userId;
      const tokenId = authStore.userToken;
      const url =
        this.firebaseEndpoint + `/subscriptions/${userId}.json?auth=` + tokenId;

      const response = await fetch(url, {
        method: "GET",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            "sth went wrong during getting list of subscription"
        );
      } else {
        const mappedData = [];
        for (const key in responseData) {
          const item = {
            id: key,
            ...responseData[key],
          };
          mappedData.push(item);
        }
        this.subscriptions = mappedData;
      }
    },
    async addSubscription(data) {
      const authStore = useAuthStore();
      const userId = authStore.userId;
      const tokenId = authStore.userToken;
      const url =
        this.firebaseEndpoint + `/subscriptions/${userId}.json?auth=` + tokenId;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "sth went wrong during adding subscription"
        );
      } else {
        const subId = responseData.name;
        const newData = { id: subId, ...data };

        this.subscriptions.push(newData);
      }
    },
    async deleteSubscription(id) {
      const authStore = useAuthStore();
      const userId = authStore.userId;
      const tokenId = authStore.userToken;
      const url =
        this.firebaseEndpoint +
        `/subscriptions/${userId}/${id}.json?auth=` +
        tokenId;

      const response = await fetch(url, {
        method: "DELETE",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("sth went wrong during deleteing subscription");
      } else {
        this.subscriptions = this.subscriptions.filter((item) => {
          return item.id !== id;
        });
      }
    },
  },
  // mounted() {
  //   console.log("Pinia mounted subscrip ");
  //   getSubscriptions;
  // },
});
