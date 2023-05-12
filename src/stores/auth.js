import { ref, computed } from "vue";
import { defineStore } from "pinia";

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
    logout() {
      (this.userId = null), (this.userName = null), (this.userToken = null);
    },
    async auth(email, password, mode) {
      let endpoint = "";
      if (mode === "login") {
        endpoint =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALuqYLRMz10nv1mpbEwjg6NQowPBbMiBQ";
      } else {
        endpoint =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALuqYLRMz10nv1mpbEwjg6NQowPBbMiBQ";
      }
      const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });
      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(
          jsonData.error.message || "sth went worong during login request"
        );
      }

      (this.userId = jsonData.localId),
        (this.userName = jsonData.email),
        (this.userToken = jsonData.idToken);
    },
  },
});
