import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
    async login(payload) {
      await this.auth(payload.email, payload.password, "login");
    },
    async signup(payload) {
      await this.auth(payload.email, payload.password, "signup");
    },
    async auth(email, password, mode) {
      let userCredential = {};
      if (mode === "login") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Signed in
        console.log("user logged in");
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("user created");
      }
      const user = userCredential.user;
      this.userId = user.uid;
      this.userName = user.email;
      this.userToken = user.accessToken;
    },
    async logout() {
      await signOut(auth);
      console.log("logged out");
    },
  },
});
