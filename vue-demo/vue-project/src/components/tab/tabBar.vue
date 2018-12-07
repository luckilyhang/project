<template>
  <div>
    <ul id="tab">
      <router-link
        :to="{'path':item.path}"
        v-for="(item,index) in arrList"
        :key="index"
        :class="{active:item.path==cur}"
        @click="fn(item,index)"
        tag="li"
      >
        <img
          :src="item.img2"
          alt=""
          v-if="item.path==cur"
        >
        <img
          :src="item.img1"
          alt=""
          v-else="item.path=!cur"
        >
        <p>{{item.name}}</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cur:'home',
      arrList: [
        {
          img1: "static/img/home.png",
          img2: "static/img/home-active .png",
          name: "首页",
          path:'home'

        },
        {
          img1: "static/img/list.png",
          img2: "static/img/list-active.png",
          name: "列表",
          path:'list'
        },
        {
          img1: "static/img/car.png",
          img2: "static/img/car-active .png",
          name: "购物车",
          path:'car'
        },
        {
          img1: "static/img/vip.png",
          img2: "static/img/vip-active.png",
          name: "会员",
          path:'vip'
        }
      ]
    };
  },
  methods: {
    
  },
  created(){
    console.log()
    this.cur=window.location.hash.split('/')[1]
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
#tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
}
li img {
  width: 30px;
  height: 30px;
}
.active {
  color: #1296db;
}
</style>


