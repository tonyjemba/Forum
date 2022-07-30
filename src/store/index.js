import { createStore } from "vuex";
import data from "@/data.json";

export default createStore({
  state: { ...data, authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3" },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId);
      if (!user) return null;

      return {
        ...user,
        // the get allows us to access these methods as properties ie authUser.post instead of calling them as methods
        get posts() {
          //returns and array of posts of the current user that are displayed in the postlist component
          return state.posts.filter((post) => post.userId === this.id);
        },
        get postCount() {
          return this.posts.length;
        },
        get threads() {
          return state.threads.filter((thread) => thread.userId === this.id);
        },
        get threadCount() {
          return this.threads.length;
        },
      };
    },
  },
  actions: {
    createPost(context, post) {
      //setting post.id explicitly(will be automated by database)
      post.id = "dummy" + Math.random();
      post.userId = context.state.authId;
      post.publishedAt= Math.floor(Date.now() / 1000),
      context.commit("setPost", { post });
      context.commit("appendPostToThread", {
        postId: post.id,
        threadId: post.threadId,
      });
    },
    updateUser({ commit }, user) {
      commit("setUser", { userId: user.id, user });
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    setUser(state, { userId, user }) {
      const userIndex = state.users.findIndex((user) => user.id === userId);
      //updating it with the current user changes
      state.users[userIndex] = user;
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.thread.find((thread) => thread.id === threadId);
      thread.posts.push(postId);
    },
  },
});
