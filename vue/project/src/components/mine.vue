<template>
    <div>
       <adventer text="我是第一个子组件 " @ntdAdd='sel'>
           <span slot="person">哈哈哈</span>
           </adventer> 
        <nthcom></nthcom>
        <span @click="author">点击我获取vuex值</span>
        <p>{{datas}}</p>
    </div>
</template>
<script>
import adventer  from "./children";
import nthcom  from "./nthCom";
export default {
    components:{
        adventer,
        nthcom
    },
    data(){
        return{
          datas:'',
        }
    },
    methods:{
        sel(val){
            console.log(val)
        },
        author(){
         this.datas= this.$store.state.author
        }
    },
//       computed:{
//          author(){
//          return this.$store.state.author
//          }
// }
}
</script>
<style>

</style>

