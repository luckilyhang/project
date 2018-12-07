<template>
  <div>
    <ul class="liststyle">
      <li
        v-for="(item,index) in arrs"
        @click="fn(item)"
        :class='{active:item.curd==curd}'
      >{{item.name}}</li>
    </ul>
    <ul class="content">
      <li
        v-for="(item,index) in arrList"
        v-show="curd==index"
        v-text="item.name"
      >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curd: 0,
      arrs: [
        {
          curd: 0,
          name: "香蕉",
          price: 23
        },
        {
          curd: 1,
          name: "苹果",
          price: 12
        },
        {
          curd: 2,
          name: "橘子",
          price: 19
        },
        {
          curd: 3,
          name: "梨",
          price: 29
        }
      ],
      arrList: [
        {
          curd: 0,
          name: "高宏伟副"
        },
        {
          curd: 0,
          name: "我i金额返回"
        },
        {
          curd: 0,
          name: "潍坊刚i"
        },
        {
          curd: 0,
          name: "完结后放i司空见惯覅上刚覅u树"
        }
      ]
    };
  },
  methods: {
    fn(item) {
      this.curd = item.curd;
    }
  }
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


