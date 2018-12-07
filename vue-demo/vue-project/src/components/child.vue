<template>
    <div>
        <!-- <h1>子组件</h1> -->
        <slot>无名槽口</slot>
        <!-- <slot style="color:red">带样式的槽口</slot> -->
        <slot name="a">第一个槽口</slot>
        <slot name="b">第二个槽口</slot>
        <slot name="c">第三个槽口</slot>
        <slot name="d">第四个槽口</slot>
         <p @click="info()">点我传递信息</p>
    </div>
   
</template>

<script>
export default {
    // props:{
    //     message:{
    //          type: Array,
    //     }
    // },
    data() {
        return {
            arr: [
                {
                    name: "电视",
                    price: 123
                },
                {
                    name: "冰箱",
                    price: 99
                },
                {
                    name: "彩电",
                    price: 97
                },
                {
                    name: "自行车",
                    price: 167
                }
            ]
        };
    },
    methods:{
        info(){
            this.$emit('add',this.arr)
        }

    },
    created(){
   
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
