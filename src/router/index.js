import { createRouter, createWebHistory } from "vue-router";
import SubscriptionList from "../views/SubscriptionList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/subscriptions",
    },
    {
      path: "/subscriptions",
      name: "subscriptionList",
      component: SubscriptionList,
    },
    {
      path: "/subscriptions/:id",
      name: "subscriptionDetails",
      component: () => import("../views/SubscriptionDetails.vue"),
    },
    {
      path: "/add",
      name: "addSubscription",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AddSubscription.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/:notFound(.*)",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
