<template>
  <div>
    <ul>
      <router-link
        :to="{path:'detail',query:{id:item.id,name:item.price}}"
        v-for="item in arrs"
        :key="item.id"
        tag="li"
      >
        {{item.name}}</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arrs: [
        {
          id: 0,
          name: "香蕉",
          price: 23
        },
        {
          id: 1,
          name: "苹果",
          price: 12
        },
        {
          id: 2,
          name: "橘子",
          price: 19
        },
        {
          id: 3,
          name: "梨",
          price: 29
        }
      ]
    };
  },
  methods: {}
};
</script>
<style>
.liststyle li {
  width: 25%;
  float: left;
  list-style: none;
}
.active {
  background: red;
}
.content li {
  list-style: none;
}
.content {
  /* width:100%; */
  min-height: 100px;
  margin-top: 10px;
}
</style>


