<template>
<forum-list
v-for="category in categories"
:key="category.id"
:forums="getForumsForCategory(category)"
:categoryName="category.name"
/>
</template>
<script>
import ForumList from './ForumList.vue';
import data from "@/data.json";
export default{
    components:{
        ForumList
    },
    props:{
        categories:{
            required : true,
            type: Array
        }
    },
    methods: {
        getForumsForCategory(category){
         return   data.forums.filter(forum => forum.id === category.id)
        }
    },
}
</script>