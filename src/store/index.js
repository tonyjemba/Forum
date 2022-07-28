import { createStore } from "vuex";
import data from '@/data.json';

export default createStore({
    state: data,
    actions:{
        createPost(context,post){
            //setting post.id explicitly(will be automated by database)
             post.id = 'dummy'+ Math.random()
            context.commit('setPost',{post});
            context.commit('appendPostToThread',{postId:post.id,threadId:post.threadId})
        }
    },
    mutations:{
        setPost(state,{post}){
            state.posts.push(post);
            
        },
        appendPostToThread(state,{postId, threadId}){
          const thread =   state.thread.find(thread=>thread.id === threadId);
          thread.posts.push(postId);
        }
    }
});