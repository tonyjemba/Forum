<template>
  <div class="col-full">
    <form @submit.prevent="post">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="formText"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit Post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formText: "",
    };
  },
  methods: {
    post() {
      
      const post = {
        text: this.formText,
        
        
      };
      this.$emit("save-post", { post });
      this.formText = "";
    },
  },
};
</script>
