<template>
  <div>
    <ul id="gooddec">
      <li
        v-for="(item,index) in detail"
        :key="index"
      >
      <span @click='del(index)'>{{item.del}}</span>
        <img
          :src="item.img"
          alt=""
        >
        <div style="padding-right:10px;">
          <p>{{item.name}}</p>
          <p>{{item.stock}}</p>
          <p>{{item.sales}}付款</p>
          <p>数量:{{item.count}}</p>
          <p>单价:{{item.price}}</p>
        </div>
        <span class="save" @click="add(item)">+</span>{{item.count=item.count?item.count:0}} <span class="save" @click="reduce(item)">-</span>
        <p>总价:{{item.price*item.count}}</p>
      </li>
    </ul>
    <div>全部金额:{{money}}</div>
  <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "./../components/tab/tabBar";
import { mapState, mapMutations } from "vuex";
export default {
  components:{
       tabBar
  },
  data() {
    return {
      dd: "",
      arr:[]
    };
  },
  created() {
    this.dd = this.$route.query.name;
    // this.arr=JSON.parse(localStorage.getItem('userInfo'));
  },
  
  computed: {
    ...mapState(["detail",'money'])
  },
  methods:{
    ...mapMutations(['add','reduce','del'])
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cate-tab {
  /* float:left; */
  display: flex;
  justify-content: space-between;
}
li {
  list-style: none;
}
#cate-tab li.active {
  background: #9a51ff;
}
#cate-tab {
  background: #5d4285;
  color: #fff;
}
#cate-tab li {
  width: 20%;
  height: 40px;
  line-height: 40px;
}
#gooddec li img {
  width: 40px;
  height: 40px;
}
#gooddec li {
  margin: 10px 10px;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.save {
  width: 32px;
  height: 22px;
  background-color: #7a45e5;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  border-radius: 12px;
  overflow: hidden;
}
</style>
