<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <ProfileCard v-if="!edit" :user="user" />
        <ProfileCardEditor v-else :user="user" />
        <p class="text-xsmall text-faded text-center">
          Member since june 2003, last visited 4 hours ago
        </p>
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }} recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <PostList :posts="user.posts" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostList from "../components/PostList.vue";
import ProfileCard from "../components/ProfileCard.vue";
import ProfileCardEditor from "../components/ProfileCardEditor.vue";

export default {
  props: {
    edit: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  components: { PostList, ProfileCard, ProfileCardEditor },
  computed: {
    ...mapGetters({ user: "authUser" }),
  },
};
</script>
