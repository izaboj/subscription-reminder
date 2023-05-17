import { createRouter, createWebHistory } from "vue-router";
import SubscriptionList from "../views/subscriptions/ViewSubscriptionList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/auth",
    },
    {
      path: "/subscriptions",
      name: "subscriptionList",
      component: SubscriptionList,
    },
    {
      path: "/subscriptions/:id",
      name: "subscriptionDetails",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import("../views/subscriptions/ViewSubscriptionDetails.vue"),
    },
    {
      path: "/add",
      name: "addSubscription",
      component: () => import("../views/subscriptions/ViewAddSubscription.vue"),
    },
    {
      path: "/auth",
      name: "authentication",
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

export default router;
