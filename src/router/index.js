import { createRouter, createWebHistory } from "vue-router";

// Pages
import SurahPage from "@/views/surah.vue";

const routes = [
  {
    path: "/:id",
    name: "home",
    component: SurahPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
