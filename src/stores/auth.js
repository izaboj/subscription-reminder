import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userName: null,
    userId: null,
    userToken: null,
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.userToken;
    },
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.setUser(user);
          this.saveToWindowLocalStorage(user);
          this.router.push("/");
        } else {
          this.setUser(user);
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
