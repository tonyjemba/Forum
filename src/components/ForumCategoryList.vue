<template>
<forum-list
v-for="category in categories"
:key="category.id"
:forums="getForumsForCategory(category)"
:categoryName="category.name"
:categoryID="category.id"
/>
</template>
<script>
import ForumList from './ForumList.vue';
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
         return   this.$store.state.forums.filter(forum => forum.categoryId === category.id)
        }
    },
}
</script>