<template>
<!-- 自定义指令创建与应用 -->
    <div>
        <button @click="btn">增加</button>
        <p v-change="count">{{count}}</p>
    </div>
</template>
    <script>
export default {
    data() {
        return {
            count:0
        };
    },
    methods:{
        btn(){
            this.count++;
        }
    },
    directives:{
        change:{
            bind(el,binding){
                console.log(binding.value)
            },
            update(el,binding){
                 console.log(binding.value)
            },
            unbind(el,binding){
                  console.log(el)
            }

        }
    }
};
</script>
    
