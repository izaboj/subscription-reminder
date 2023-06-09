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
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { ListItems } from "@/types";

// store  + router
const authStore = useAuthStore();

// data + computed
const drawer = ref<boolean>(false);

const listItems: ListItems[] = [
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
const setDrawerSubtitle = computed<string>(() => {
  return authStore.isLoggedIn ? "Logged in" : "Logged out";
});
const setDrawerTitle = computed<string>(() => {
  return authStore.isLoggedIn ? authStore.userName : "";
});
const setButtonCaptions = computed<string>(() => {
  return authStore.isLoggedIn ? "Logout" : "Login";
});

// methods
const clickAction = (): void => {
  if (authStore.isLoggedIn) {
    authStore.logout();
  }
};

// hooks
onMounted(() => {
  authStore.init();
});
</script>
