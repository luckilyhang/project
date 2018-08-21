<template>
    <div>
            <h6 v-text="text"></h6>
            <span @click="add">点我数据</span>
            <div @click="on">兄弟传值</div>
            <slot name="person" style="color:red">呵呵呵文具盒方便就好比我 </slot>
    </div>
</template>
<script>
export default {
    props:['text'],
    data(){
        return{ 
           datas:'兄弟组件之间传值'
        }
    },
    methods:{
    add(){
        this.$emit('ntdAdd','信息')
    },
    on(){
      this.$root.eventHub.$emit("eventName",this.datas)  
    }
    }

}
</script>
<style>


</style>


