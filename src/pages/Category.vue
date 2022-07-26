<template>
<h1>category.name</h1>
  <forum-list
    :categoryName="category.name"
    :forums="getForumsForCategory(category)"
  />
</template>
<script>
import ForumList from "../components/ForumList.vue";
import data from "@/data.json";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    ForumList,
  },
  computed: {
    category() {
      return data.categories.find((category) => category.id === this.id);
    },
  },
  methods: {
    getForumsForCategory(category) {
      return data.forums.filter((forum) => forum.categoryId === category.id);
    },
  },
};
</script>
