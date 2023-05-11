<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" location="left">
      <template v-slot:prepend>
        <v-list-item
          lines="three"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          title="Jane Smith"
          subtitle="Logged in"
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
          <v-btn variant="text" @click="logout"> Logout </v-btn>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Subscription Reminder</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup>
import { ref } from "vue";
import router from "./router";

const drawer = ref(null);
const listItems = [
  {
    icon: "mdi-youtube-subscription",
    link: "/subscriptions",
    title: "List of subscriptions",
  },
  {
    icon: "mdi-plus",
    link: "/add",
    title: "Add subscription",
  },
  {
    icon: "mdi-information-outline",
    link: "/about",
    title: "About",
  },
];

function logout() {
  router.push("/auth");
}
</script>
