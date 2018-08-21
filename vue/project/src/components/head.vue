<template>
    
<mt-header fixed :title=text>
  <router-link to="/" slot="left">
  <mt-button icon="back">返回</mt-button>
  </router-link>
  <!-- <span v-text="text"></span> -->
  <mt-button icon="more" slot="right"></mt-button>
</mt-header>
<!-- <slot name="dd" v-text=""></slot> -->
    
</template>
<script>
export default {
    props:['text'],
    data(){
       return{
      
       } 
    },
    methods:{
      
    }

}
</script>
<style>


</style>


