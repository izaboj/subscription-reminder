<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" location="left">
      <template v-slot:prepend>
        <v-list-item
          lines="three"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          :title="setDrawerTitle"
          :subtitle="setDrawerSubtitle"
        ></v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in listItems"
          :key="i"
          :value="item.title"
          :to="item.link"
          link
          variant="plain"
          active-color="primary"
          :ripple="false"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-container class="my-4">
        <v-row justify="center">
          <v-btn color="primary" @click="clickAction">
            {{ setButtonCaptions }}
          </v-btn>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="d-flex justify-end mr-3"
        ><div class="text-primary">Subscription Reminder</div></v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(null);
const listItems = [
  {
    icon: "mdi-youtube-subscription",
    link: "/subscriptions",
    title: "List of subscriptions",
  },
  // {
  //   icon: "mdi-plus",
  //   link: "/subscriptions/add",
  //   title: "Add subscription",
  // },
  {
    icon: "mdi-information-outline",
    link: "/about",
    title: "About",
  },
];
const setDrawerSubtitle = computed(() => {
  return authStore.isLoggedIn ? "Logged in" : "Logged out";
});
const setDrawerTitle = computed(() => {
  return authStore.isLoggedIn ? authStore.userName : "";
});
const setButtonCaptions = computed(() => {
  return authStore.isLoggedIn ? "Logout" : "Login";
});

authStore.tryLogin();
console.log("im created APP vue");

const clickAction = () => {
  if (authStore.isLoggedIn) {
    authStore.logout();
  }
  router.replace("/auth");
};
</script>
