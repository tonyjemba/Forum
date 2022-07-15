<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />
    <post-editor @save-post="addPost" />
  </div>
</template>
<script>
import data from "@/data.json";
import PostList from "@/components/PostList.vue";
import PostEditor from "../components/PostEditor.vue";

export default {
  name: "ThreadShow",
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: {
    PostList,
    PostEditor,
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
   methods:{
    addPost(eventdata){
      const post = {
       ...eventdata.post,
        threadId : this.id
      }
        this.posts.push(post);
        this.thread.posts.push(post.id);

    }
  }

};
</script>
