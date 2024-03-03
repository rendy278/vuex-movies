import { createRouter, createWebHistory } from "vue-router";
import Home from "../src/components/Home.vue";
import Moviedetails from "../src/components/Moviedetails.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie/:id",
    name: "Movie Detail",
    component: Moviedetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
