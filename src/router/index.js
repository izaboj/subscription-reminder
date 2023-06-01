import { createRouter, createWebHistory } from "vue-router";
import SubscriptionList from "../views/subscriptions/ViewSubscriptionList.vue";
import { useAuthStore } from "@/stores/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/subscriptions",
      name: "home",
    },
    {
      path: "/subscriptions",
      name: "subscriptionList",
      component: SubscriptionList,
    },
    {
      path: "/subscriptions/edit/:id",
      name: "subscriptionDetails",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import("../views/subscriptions/ViewEditSubscription.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/auth/ViewUserAuth.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/ViewAbout.vue"),
    },
    {
      path: "/:notFound(.*)",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

// router.beforeEach(async (to, from) => {
//   // store
//   const authStore = useAuthStore();
//   console.log("authStore", authStore.isLoggedIn);
//   if (!authStore.isLoggedIn && to.name !== "auth") {
//     return { name: "auth" };
//   }
// });

export default router;
