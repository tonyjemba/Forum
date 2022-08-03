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
      (post.publishedAt = Math.floor(Date.now() / 1000)),
        context.commit("setPost", { post });
      context.commit("appendPostToThread", {
        postId: post.id,
        threadId: post.threadId,
      });
    },
    updateUser({ commit }, user) {
      commit("setUser", { userId: user.id, user });
    },
   async updateThread({ commit, state }, { title, text, id }) {
      const thread = state.threads.find((thread) => thread.id === id);

      const post = state.post.find((post) => post.id === thread.posts[0]);

      const newThread = { ...thread, title };
      const newPost = { ...post, text };

      commit("setThread", { thread: newThread });
      commit("setPost", { post: newPost });

      return newThread
    },
    async createThread({ commit, state, dispatch }, { title, text, forumId }) {
      //setting post.id explicitly(will be automated by database)
      const id = "dummy" + Math.random();
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = { forumId, title, publishedAt, userId, id };

      commit("setThread", { thread });
      commit(" appendThreadToUser", { userId, threadId: id });
      commit(" appendThreadToForum", { forumId, threadId: id });
      dispatch("createPost", { text, threadId: id });

      return state.threads.find((thread) => thread.id === id);
    },
  },

  mutations: {
    setThread(state, { thread }) {
      //if thread already exists update
      const index = state.threads.findIndex((t) => t.id === thread.id);
      if (thread.id && index !== -1) {
        state.threads[index] = thread;
      } else {
        //push it as new
        state.threads.push(thread);
      }
    },
    setPost(state, { post }) {
      //if post already exists update
      const index = state.posts.findIndex((p) => p.id === post.id);
      if (post.id && index !== -1) {
        state.posts[index] = post;
      } else {
        //push it as new
        state.posts.push(post);
      }
    },
    setUser(state, { userId, user }) {
      const userIndex = state.users.findIndex((user) => user.id === userId);
      //updating it with the current user changes
      state.users[userIndex] = user;
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId);
      thread.posts = thread.posts || [];
      thread.posts.push(postId);
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = state.forums.find((forum) => forum.id === forumId);
      forum.threads = forum.threads || [];
      forum.threads.push(threadId);
    },
    appendThreadToUser(state, { userId, threadId }) {
      const user = state.users.find((user) => user.id === userId);
      user.threads = user.threads || [];
      user.threads.push(threadId);
    },
  },
});
