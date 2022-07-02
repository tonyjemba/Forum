<template>
<div>Home  </div>

<div v-for="thread in threads" :key="thread.id">
{{ thread.title }}
</div>



</template>
<script>
import data from '@/data.json';

export default{
     data(){
    return {
      threads : data.threads,
      posts : data.posts,
      users : data.users
    }
}
}

</script>