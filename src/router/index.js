import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import ThreadShow from "@/pages/ThreadShow.vue";
import NotFound from "@/pages/NotFound.vue";
import Category from "@/pages/Category.vue";
import Forum from "../pages/Forum.vue";
import dataSource from "@/data.json";
import Profile from "../pages/Profile.vue";
import ThreadCreate from "../pages/ThreadCreate.vue";
import ThreadEdit from "../pages/ThreadEdit";

//defining routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/myprofile",
    name: "Profile",
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: "/myprofile/edit",
    name: "ProfileEdit",
    component: Profile,
    //when active, will set the profile page edit prop to true
    props: { edit: true },
  },
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
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
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
  scrollBehavior(to) {
    if (to.meta.toTop && to.meta.smoothScroll) {
      //if the route has those meta properties defined it will smoth scroll to top after 0.3sec
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ top: 0, behavior: "smooth" });
        }, 300);
      });
    }
    return null;
  },
});
