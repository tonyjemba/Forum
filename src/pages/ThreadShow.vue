<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />
  </div>
</template>
<script>
import data from "@/data.json";
import PostList from "@/components/PostList.vue";

export default {
  name: "ThreadShow",
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components:{
    PostList
  },
  data() {
    return {
      threads: data.threads,
      posts: data.posts,
    };
  },
  computed: {
    thread() {
      return this.threads.find((thread) => thread.id === this.id); //can be accesed with this.$route.params.id
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },
};
</script>

