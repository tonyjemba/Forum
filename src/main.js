import { createApp } from "vue";
import App from "./App.vue";
import {createRouter,createWebHistory} from 'vue-router';
import PageHome from "@/components/PageHome.vue";
import PageThreadShow from '@/components/PageThreadShow.vue'

//defining routes
const routes = [
    { path: "/",
    name: "Home",
     component: PageHome
     },
     {
        path:"/thread/:id",
        name:"ThreadShow",
        component: PageThreadShow
     }
];
// creating vue router
const router = createRouter({
    //  Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })

const app = createApp(App);

app.use(router);
app.mount("#app");
