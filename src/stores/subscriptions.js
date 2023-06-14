import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { db } from "@/js/firebase";
import { collection, onSnapshot } from "firebase/firestore";

let unsubscribe = null;
let collectionRef;

export const useSubscriptionsStore = defineStore("subscriptions", {
  state: () => ({
    isLoading: false,
    subscriptions: [],
  }),
  getters: {
    hasSubscriptions(state) {
      return state.subscriptions && state.subscriptions.length > 0;
    },
  },
  actions: {
    init() {
      const authStore = useAuthStore();
      const userId =
        JSON.parse(localStorage.getItem("user")) || authStore.userId;
      collectionRef = collection(db, "users", userId, "subscriptions");
      this.getSubscriptions();
    },
    clearSubscriptions() {
      this.subscriptions = [];
    },
    async getSubscriptions() {
      this.isLoading = true;

      if (unsubscribe) unsubscribe(); //unsubscribe from any active listener

      unsubscribe = onSnapshot(
        collectionRef,
        (querySnapshot) => {
          let subscriptionsList = [];
          querySnapshot.forEach((doc) => {
            subscriptionsList.push({
              id: doc.id,
              name: doc.data().name,
              price: doc.data().price,
              link: doc.data().link,
              reminder: doc.data().reminder,
            });
          });
          this.subscriptions = subscriptionsList;
          this.isLoading = false;
        },
        (error) => {
          throw new Error(error);
        }
      );
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
});
