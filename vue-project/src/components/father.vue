<template>
  <div>
    <!-- <h2>hahah </h2> -->
    <tap>
      <span>文具盒</span>
      <span slot="a">1</span>
      <span slot="b">2</span>
      <span slot="c">3</span>
      <span slot="d">4</span>
    </tap>
    <router-link to="/sibli">
    <button @click="add">点我传递信息给其他组件</button>
    </router-link>
  </div>
</template>
<script>
import tap from "./child";
import Bus from "./../bus.js";
export default {
    components: {
        tap
    },
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
    methods: {
        add() {
            Bus.$emit("val", this.arr);
        }
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
