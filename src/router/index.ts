import Home from '../views/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const BloodPools = () => import("../views/BloodPools.vue");
const PumpkinPatches = () => import("../views/PumpkinPatches.vue");
const Roadmap = () => import("../views/Roadmap.vue")

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/blood-pools",
        name: "BloodPools",
        component: BloodPools
    },
    {
        path: "/pumpkin-patches",
        name: "PumpkinPatches",
        component: PumpkinPatches
    },
    {
        path: "/roadmap",
        name: "Roadmap",
        component: Roadmap
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;