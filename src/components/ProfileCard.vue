<template>
  <div class="profile-card">
    <p class="text-center">
      <img
        :src="user.avatar"
        :alt="`${user.name} profile picture`"
        class="avatar-xlarge"
      />
    </p>

    <h1 class="title">{{ user.username }}</h1>

    <p class="text-lead">{{ user.name }}</p>

    <p class="text-justify">{{ user.bio || "No bio specified" }}</p>

    <span class="online">{{ user.name }} is online</span>

    <div class="stats">
      <span>{{ user.postCount }} posts</span>
      <span>{{ user.threadCount }} threads</span>
    </div>

    <hr />

    <p v-if="user.website" class="text-large text-center">
      <i class="fa fa-globe"></i>
      <a :href="user.website">{{ user.website }}</a>
    </p>
    <div class="text-center">
    <router-link class="btn-green btn-small" :to="{name:'ProfileEdit'}">Edit Profile</router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
};
</script>
