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
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
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

      console.log("jsonData", jsonData);

      if (!response.ok) {
        throw new Error(
          jsonData.error.message || "sth went worong during login request"
        );
      }

      // to local storage
      // 3600s -> ms
      // const expiresIn = +jsonData.expiresIn * 1000;
      // 24h -> ms
      const expiresIn = 24 * 3600 * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", jsonData.idToken);
      localStorage.setItem("userId", jsonData.localId);
      localStorage.setItem("expirationDate", expirationDate);

      // set userId and
      (this.userId = jsonData.localId),
        (this.userName = jsonData.email),
        (this.userToken = jsonData.idToken);
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const expirationDate = localStorage.getItem("expirationDate");

      const expiresIn = +expirationDate - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      if (token && userId) {
        (this.userId = userId),
          (this.userName = null),
          (this.userToken = token);
      } else {
        return;
      }
    },
  },
});
