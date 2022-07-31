<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel"/>
  </div>
</template>
<script>
import ThreadEditor from '../components/ThreadEditor.vue';
export default {
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  components:{
    ThreadEditor
  },
  computed:{
    forum(){
        return this.$store.state.forums.find(forum=>forum.id === this.forumId)
    }
  },
  methods: {
    async save({title, text}) {
//createThread is an async action that returns the thread, we await the thread to be returned so 
//that we can use it in the  router line below

        const thread = await this.$store.dispatch('createThread', {
            forumId: this.forum.id,
            title,
            text
        });

        this.$router.push({name:'ThreadShow', params:{id: thread.id}})
    },
    cancel(){
       this.$router.push({name:'Forum', params:{id: this.forum.id}})
    }
  },
};
</script>
