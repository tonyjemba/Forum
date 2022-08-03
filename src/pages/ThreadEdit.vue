<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor :text="text" :title="thread.title"  @save="save" @cancel="cancel" />
  </div>
</template>
<script>
import ThreadEditor from "../components/ThreadEditor.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    ThreadEditor,
  },
  computed: {
    thread() {
      return this.$store.state.threads.find(
        (thread) => thread.id === this.threadId
      );
    },
    text(){
        return this.$store.state.posts.find(post=>post.id === this.thread.posts[0]).text
    }
  },
  methods: {
    async save({ title, text }) {
      //createThread is an async action that returns the thread, we await the thread to be returned so
      //that we can use it in the  router line below

      const thread = await this.$store.dispatch("updateThread", {
        id: this.id,
        title,
        text,
      });

      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "Forum", params: { id: this.forum.id } });
    },
  },
};
</script>
