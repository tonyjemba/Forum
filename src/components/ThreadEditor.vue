<template>
  <div>
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input
          v-model="form.title"
          type="text"
          id="thread_title"
          class="form-input"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
          v-model="form.text"
        ></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost" @click.prevent="$emit(cancel)">
          Cancel
        </button>
        <button class="btn btn-blue" type="submit" name="Publish">
          Publish
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type: String,
      default:''
    },
    text:{
      type: String,
      default:''
    },
    
  },
  data() {
    return {
     form:{ title: this.title,
      text: this.text,}
    };
  },
  methods: {
    save() {
      this.$emit("save", { ...this.form  });
    },
  },
};
</script>
