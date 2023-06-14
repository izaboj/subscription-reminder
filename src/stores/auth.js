import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import { useSubscriptionsStore } from "./subscriptions.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: null,
    userName: null,
    userToken: null,
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.userToken;
    },
  },
  actions: {
    init() {
      const subStore = useSubscriptionsStore();
      onAuthStateChanged(auth, (user) => {
        //login
        if (user) {
          this.setUser(user);
          subStore.init();
          this.saveToWindowLocalStorage(user);
          this.router.push("/");
          //logout
        } else {
          this.setUser();
          subStore.clearSubscriptions();
          this.removeFromWindowLocalStorage();
          this.router.replace("/auth");
        }
      });
    },
    setUser(user) {
      this.userId = user?.uid || null;
      this.userName = user?.email || null;
      this.userToken = user?.accessToken || null;
    },
    saveToWindowLocalStorage(user) {
      localStorage.setItem("user", JSON.stringify(user.uid));
      localStorage.setItem("token", JSON.stringify(user.accessToken));
    },
    removeFromWindowLocalStorage() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    async login(payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
    },
    async signup(payload) {
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
    },
    async logout() {
      await signOut(auth);
    },
  },
});
