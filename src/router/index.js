import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@/components/PageHome.vue";
import PageThreadShow from "@/components/PageThreadShow.vue";
import PageNotFound from "../components/PageNotFound.vue";
import dataSource from "@/data.json";

//defining routes
const routes = [
  { path: "/", name: "Home", component: PageHome },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: PageThreadShow,
    props: true,
    //adding navigation guard
    beforeEnter: (to, from, next) => {
      // check of thread exists
      const threadexists = dataSource.threads.find(
        (thread) => thread.id === to.params.id
      );
      //if exists continue
      if (threadexists) {
        next();
      } else {
        next({
          name: "NotFound",
          //path remains the same
          params: { pathMatch: to.path.substring(1).split("/") },
          //preserving the existing query and hash
          querr: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
  },
];
// creating vue router
export default createRouter({
  //  Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
