import { createRouter, createWebHistory } from "vue-router";

const routes = [

    { path: "/", name : "home", component: () => import("@/views/Home.vue") },

    { path: "/people", name : "people", component: () => import("@/views/people/Index.vue") },

    { path: "/people/create", name : "people-create", component: () => import("@/views/people/Create.vue") },

    { path: "/people/edit/:id", name : "people-edit", component: () => import("@/views/people/Edit.vue") },




    { path: "/specialization", name : "specialization", component: () => import("@/views/specialization/Index.vue") },

    { path: "/specialization/create", name : "specialization-create", component: () => import("@/views/specialization/Create.vue") },
    
    { path: "/specialization/edit/:id", name : "specialization-edit", component: () => import("@/views/specialization/Edit.vue") }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;