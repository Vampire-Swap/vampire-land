import Home from '../views/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/blood-pools",
        name: "BloodPools",
        component: () => import("../views/BloodPools.vue")
    },
    {
        path: "/pumpkin-patches",
        name: "PumpkinPatches",
        component: () => import("../views/PumpkinPatches.vue")
    },
    {
        path: "/roadmap",
        name: "Roadmap",
        component: () => import("../views/Roadmap.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;