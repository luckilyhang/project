<template>
    <div>
    <h2>我是第二个子组件</h2>
    <span>{{datas}}</span>
    </div>
</template>
<script>
export default {
    data(){
        return{
            datas:''
        }
    },
    created(){
        this.$root.eventHub.$on("eventName",(tar)=>{
            this.fn(tar)
        })
    },
    methods:{
    fn:function(tar){
    this.datas = tar
    }
    }
    

}
</script>
<style>


</style>


