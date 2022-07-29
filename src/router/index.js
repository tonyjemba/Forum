import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import ThreadShow from "@/pages/ThreadShow.vue";
import NotFound from "@/pages/NotFound.vue";
import Category from "@/pages/Category.vue"
import Forum from "../pages/Forum.vue";
import dataSource from "@/data.json";
import Profile from '../pages/Profile.vue'

//defining routes
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/myprofile", name: "Profile", component: Profile },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
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
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path:"/category/:id",
    name:"Category",
    component:Category,
    props: true
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: Forum,
    props: true, // to be able to work with parameters as props
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
// creating vue router
export default createRouter({
  //  Provide the history implementation to use.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
