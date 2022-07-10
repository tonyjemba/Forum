<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />
    <div class="col-full">
      <form>
        <div class="form-group">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="form-input"
            v-model="newPostText"
          ></textarea>
        </div>
        <div class="form-actions">
          <button class="btn-blue">Submit Post</button>
        </div>
      </form>
    </div>
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
  components: {
    PostList,
  },
  data() {
    return {
      threads: data.threads,
      posts: data.posts,
      newPostText: ""
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
    addPost(){
      const post = {
        text : this.newPostText,
        publishedAt : Math.floor(Date.now() / 1000),
        threadId : this.id,
        userId : "ALXhxjwgY9PinwNGHpfai6OWyDu2"
      }
    }
  }
};
</script>
